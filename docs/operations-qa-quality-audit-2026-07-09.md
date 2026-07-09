# Operations Q&A Quality Audit 2026-07-09

Scope audited: all `인프라·운영 Q&A` menu pages.

| Item | File | Sections | Verdict |
| --- | --- | ---: | --- |
| 인프라·운영 로드맵 Q&A | `operations-roadmap-qa-handbook.html` | 12 | B+ |
| 서비스 요청 경로 Q&A | `operations-request-path-qa-handbook.html` | 12 | B+ |
| VPC·Subnet·Routing·NAT Q&A | `operations-vpc-routing-qa-handbook.html` | 12 | B+ |
| 보안 경계 Q&A | `operations-security-boundary-qa-handbook.html` | 12 | B+ |
| DNS·TLS·도메인 운영 Q&A | `operations-dns-tls-qa-handbook.html` | 12 | B+ |
| VPN·Private Connectivity Q&A | `operations-private-connectivity-qa-handbook.html` | 12 | B+ |
| CI/CD·Artifact·Environment Q&A | `operations-delivery-pipeline-qa-handbook.html` | 12 | B+ |
| 컨테이너·오케스트레이션·Health Check Q&A | `operations-runtime-orchestration-qa-handbook.html` | 12 | B+ |
| IaC·변경관리·Drift Q&A | `operations-iac-change-qa-handbook.html` | 12 | B+ |
| Observability·SLO Q&A | `operations-observability-slo-qa-handbook.html` | 12 | B+ |
| Incident Response·Rollback·DR Q&A | `operations-incident-dr-qa-handbook.html` | 12 | B+ |
| 운영 체크리스트·면접 답변 Q&A | `operations-checklist-interview-qa-handbook.html` | 12 | B+ |
| AWS·Azure 실전 시나리오 Q&A | `operations-cloud-scenarios-qa-handbook.html` | 12 | B+ |
| AI·LLM 운영 Addendum Q&A | `operations-ai-llm-operations-qa-handbook.html` | 12 | B+ |

## Initial Diagnosis

The first generated pages were present and complete, but the content source was structurally weak:

- `scripts/generate-operations-qa-handbooks.mjs` uses `checks` arrays plus `makeQuestion(page, check, index)` to synthesize every Q&A section.
- The three follow-up prompts are repeated across all sections: first evidence, impact of wrong judgment, and evidence closure.
- The answers interpolate topic names and evidence lists, so they look topic-aware but still share the same reasoning shape across unrelated questions.
- The generator can reintroduce generic answers because the authored unit is a keyword, not a full question and answer packet.

## Reaudit After User Challenge

The first corrective pass removed `makeQuestion` and converted the generator to explicit page data, but that was still insufficient. A second audit found semantic copy-paste patterns that exact string duplicate checks did not catch:

- Repeated answer skeletons such as "normal is readback evidence", "immediate mitigation and permanent fix", and "recovery prevention goes into runbook/alert/checklist" appeared across unrelated pages.
- Several answers differed only by inserted topic names and evidence labels.
- English-heavy topic labels were normalized away by the test scanner, revealing the same Korean reasoning frame underneath.

The remediation therefore added a stricter source/output gate in `scripts/handbook-html.test.mjs`: all 14 operations Q&A pages are scanned, every section must have exactly three explicit follow-up answers, and normalized semantic skeletons may not repeat across the corpus.

## Final Remediation

The current source uses explicit authored Q&A packets for 14 pages, 168 sections, and 504 follow-up answers. The generator renders those packets and fails fast if a follow-up is still a shorthand string. Each follow-up now carries a page- and question-specific operational focus, concrete evidence, a risk signal, and a next action tied to the relevant operations surface:

- request path: DNS cache, TLS handshake, WAF request id, target health, trace span
- VPC/routing: CIDR overlap, NAT port pressure, route association, NACL return path
- security boundary: IAM condition, secret rotation, egress allowlist, break-glass access
- DNS/TLS: authoritative answer, resolver cache, CAA, SAN, SNI, certificate chain
- runtime/IaC/observability/incident/LLM operations: domain-specific evidence and mitigation language per page

## Required Bar

Every operations Q&A section must be explicit source data:

- A concrete question title.
- A topic-specific decision paragraph.
- A topic-specific failure paragraph.
- Three follow-up question/answer objects authored for that section.
- An evidence packet tied to the exact operational surface.

The generator may render explicit data, but it must not synthesize Q&A content from `checks`, broad pattern matchers, or fallback answer helpers.

## Verification Snapshot

- `node --check scripts/generate-operations-qa-handbooks.mjs`: pass
- `node scripts/generate-operations-qa-handbooks.mjs`: regenerated 14 operations Q&A handbooks
- `npm run generate:handbook`: pass
- `npm test -- --test-name-pattern='operations Q&A handbooks'`: pass, including normalized semantic skeleton duplicate detection

## Session 01 - operations-roadmap-qa Diagnosis

Scope: `operations-roadmap-qa` only. Audited 12 sections and 36 follow-up answers in `scripts/generate-operations-qa-handbooks.mjs` and the generated `public/handbook/operations-roadmap-qa-handbook.html`.

Pre-rewrite verdict: severe/generated filler. The page is structurally complete, but it still reads as topic substitution rather than an authored operations roadmap Q&A.

Findings:

- The 12 section titles repeat four molds: 장애 판단, 변경 리뷰, 운영 인수, 장애 완화. These do not map cleanly to the requested distinct surfaces: 운영 지도, 요청경로, 변경경로, 복구경로, control plane, data plane, service catalog, dependency map, owner matrix, SLO burn, rollback drill, runbook maturity.
- The first answer in most sections repeats the same skeleton: "판독 초점은 ...입니다", then a generic evidence pairing. This appears in all 36 follow-up answers and hides whether the answer is about a route, owner, rollback, or runbook maturity decision.
- Several answers do not directly answer the follow-up. Examples: "요청 경로 승인 차단" talks about service dependency readback but does not say what blocks approval; "data plane 되돌림 선택" says to record hypotheses but does not define rollback criteria; "rollback drill 답변 깊이" sends the reader to service catalog reachability rather than drill success/failure.
- Awkward generated Korean is visible: "담당 팀을 확정로", "변경 경로은", "owner matrix은", "소유자가 비어 있음를", and Q12 has a blank topic: " 운영 인수", "주제는 입니다", " 에서 가장 위험한 출발".
- Evidence is listed but not operationally consumed. Many answers name `SLO burn chart`, `dependency map diff`, or `owner matrix` without saying which field proves normal, which field blocks rollout, or what action follows.
- Failure modes repeat across unrelated sections: "소유자가 비어 있음", "의존 서비스 영향 누락", "최근 배포와 증상 시각 불일치", "완화 담당자 미지정" are inserted mechanically rather than tied to the section's real operating risk.

Session 01 rewrite plan:

- Replace the whole `operations-roadmap-qa` page object with explicit authored content.
- Keep exactly 12 sections and 3 follow-up Q&A rows per section.
- Make each section focus on a different roadmap surface: operating map, request path, change path, recovery path, control plane, data plane, service catalog, dependency map, owner matrix, SLO burn, rollback drill, runbook maturity.
- Each follow-up answer must directly answer the question and include at least two of: judgment criteria, failure mode, evidence artifact, next action.
- Avoid generated connector fragments and banned awkward strings.

Session 01 post-rewrite result:

- Rewrote only the `operations-roadmap-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Target count after generation: 12 `qa-*` sections and 36 follow-up answer rows in `public/handbook/operations-roadmap-qa-handbook.html`.
- The page no longer has the blank Q12 topic. Q12 is now `runbook maturity` and includes freshness timestamp, command output sample, access check, handoff note, escalation condition, and drill follow-up.
- Target HTML scan for `입니다.내부`, `조정를`, `확정를`, `끊김가`, `확정로`, `경로은`, `matrix은`, `있음를`, `주제는 입니다`, `단일 원인`, `내부 오류로 넘기기 전`, and `판독 초점은 운영지형도` returned no matches.

Human-read sample:

- `qa-1` reads as an operating map answer, not a generic incident answer. It fixes the first boundary as user impact, owner, dependency, SLO burn, and deploy marker, then gives direct follow-up answers about initial evidence, normal/risk split, and what to leave after correcting a wrong boundary.
- `qa-6` reads as a data plane answer. It uses per-tenant SLI, shard error samples, queue lag, downstream latency, rollback side effects, and compensation ownership. The answers are not interchangeable with the control plane or request path sections.
- `qa-12` reads as a runbook maturity answer. It has no blank topic or generated fragment, and the follow-ups directly cover handoff evidence, depth criteria, risk conditions, evidence, and next drill actions.

Session 01 verification:

- `node --check scripts/generate-operations-qa-handbooks.mjs`: pass
- `node scripts/generate-operations-qa-handbooks.mjs`: pass, regenerated 14 operations Q&A handbooks
- `npm run generate:handbook`: pass
- `npm test -- --test-name-pattern='operations Q&A handbooks'`: pass, 104 tests, 0 failures

## Session 02 - operations-request-path-qa Diagnosis

Scope: `operations-request-path-qa` only. Audited 12 sections and 36 follow-up answers in `scripts/generate-operations-qa-handbooks.mjs` before editing.

Pre-rewrite verdict: severe/generated filler. The page is complete in count, but most answers are assembled from the same skeleton and do not give distinct service request path reasoning.

Findings:

- The 36 follow-up answers repeatedly begin with `판독 초점은 ...` and then attach a topic label. This makes DNS, TLS, CDN, WAF, load balancer, trace, DB pool, timeout budget, regional failure, and timeline answers feel interchangeable.
- Several answers do not answer the exact follow-up question. For example, `CDN cache 답변 깊이` talks about an internal handoff boundary instead of cache freshness or cache-bypass evidence, and `app access log 인계 증거` repeats DNS cache readback instead of explaining log handoff.
- Awkward generated Korean is visible: `단일 원인`, `내부 오류로 넘기기 전`, `정상 선언에는 ... 같은 결론`, `첫 실패 hop 확정로`, `trace root span이 생성되지 않음를`, and `app access log은 정상 판정`.
- Evidence names are present but not operationally consumed. Answers mention `ALB access log`, `WAF sampled request`, `target group health`, or `synthetic probe` without saying which field decides the boundary, what failure mode it proves, or what action follows.
- Failure modes repeat across unrelated sections: `특정 지역 resolver만 실패`, `target은 healthy인데 handshake가 끊김`, `애플리케이션 로그가 비어 있는데 5xx가 앞단에서 증가`, and `trace root span이 생성되지 않음` are injected mechanically rather than tied to each section.

Session 02 rewrite plan:

- Replace only the `operations-request-path-qa` page object with explicit authored content.
- Keep exactly 12 sections and 3 follow-up Q&A rows per section.
- Give each section a different request-path surface: DNS resolution, TLS handshake, CDN/cache, WAF, load balancer, 502/503/504, app access log, traceId, DB connection pool, timeout budget, regional failure, and request timeline.
- Each follow-up answer must directly answer the question and include at least two concrete elements among judgment criteria, failure mode, evidence, and next action.
- Remove the target page's generated skeleton phrases and awkward Korean connector fragments.

Session 02 post-rewrite result:

- Rewrote only the `operations-request-path-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Target count after generation: 12 `qa-*` sections and 36 follow-up answer rows in `public/handbook/operations-request-path-qa-handbook.html`.
- The page now separates request-path surfaces by DNS answer/TTL, TLS chain/SNI/client matrix, CDN cache status and purge evidence, WAF rule id/action, ALB target status split, 502/503/504 status origin, app access log request identity, trace propagation, DB pool checkout wait, timeout budget order, regional/POP impact, and per-hop request timeline.
- Target source and generated output scan for `판독 초점은`, `단일 원인`, `내부 오류로 넘기기 전`, `조정를`, `확정로`, `끊김가`, `정상 선언에는`, `후속 조치는 임시 완화와 영구 수정`, `첫 실패 hop 확정로`, `생성되지 않음를`, and `app access log은` returned no matches inside the target page scope.
- Post-review cleanup replaced six generic follow-up titles in CDN cache, app access log, and regional failure sections so the rendered questions no longer use the `답변 깊이` or `경험 경계` title mold.

Human-read sample:

- `qa-1` reads as DNS resolution triage. It answers with resolver answer, TTL, authoritative record, curl timing, stale cache risk, and concrete next actions such as DNS rollback, dual serving, and multi-region synthetic lookup.
- `qa-6` reads as 502/503/504 separation, not a generic 5xx answer. It distinguishes status-code origin, target response time, rollback marker, retry/downstream timeout risk, and code-specific alert/runbook follow-up.
- `qa-12` reads as request timeline triage. It places DNS, TCP, TLS, CDN/WAF, load balancer, app, and DB/downstream hops in order, then ties immediate mitigation and recurrence prevention to the first failing hop and marker evidence.

Session 02 verification:

- `node --check scripts/generate-operations-qa-handbooks.mjs`: pass
- `node scripts/generate-operations-qa-handbooks.mjs`: pass, regenerated 14 operations Q&A handbooks
- `npm run generate:handbook`: pass
- `npm test -- --test-name-pattern='operations Q&A handbooks'`: pass, 104 tests, 0 failures

## Session 03 - operations-vpc-routing-qa Diagnosis

Scope: `operations-vpc-routing-qa` only. Audited the current 12 sections and 36 follow-up answers in `scripts/generate-operations-qa-handbooks.mjs` and the generated `public/handbook/operations-vpc-routing-qa-handbook.html` before editing.

Pre-rewrite verdict: severe/generated filler. The page has the required section and follow-up counts, but the content is not yet an authored VPC routing operations Q&A.

Findings:

- The 12 section titles use a repeated template such as `무엇을 먼저 보나요? 판독 축은 ...입니다`, and several topics are paired with the wrong mechanism. Example: Internet Gateway is framed around Private DNS, and route table handoff is framed around NAT port instead of route association and precedence.
- The 36 follow-up answers repeatedly begin with `판독 초점은 ...` and reuse the same five skeletons: early readback, risk split, follow-up cleanup, normal sample comparison, and recurrence device. CIDR overlap, Transit Gateway, route tables, and NACL answers differ mostly by topic substitution.
- Several follow-up answers do not directly answer the question. Examples: `route table 답변 깊이` talks about NAT gateway scale-out instead of route precedence; `Internet Gateway 승인 차단` talks about Private DNS readback instead of public route and IGW attachment; `flow log 판독 계층 분리` leaves a NAT port hypothesis instead of interpreting Flow Logs.
- Awkward Korean and banned strings are visible in the target output: `판독 초점은`, `답변 깊이`, `경험 경계`, `단일 원인`, `내부 오류로 넘기기 전`, `해석를`, `분산로`, `NAT gateway은`, and `Private Endpoint은`.
- Evidence is named but not operationally consumed. `VPC Flow Logs`, `Reachability Analyzer`, `NAT gateway metrics`, `resolver query log`, and `packet capture` appear without saying which field proves the first boundary, what failure mode is blocked, or what next action follows.
- The page is missing distinct judgment axes for key VPC routing surfaces: route table association, longest-prefix precedence, public route to Internet Gateway, Transit Gateway propagation, Security Group versus NACL behavior, NACL ephemeral return path, PrivateLink DNS, Flow Logs interpretation, and Reachability Analyzer handoff.

Session 03 rewrite plan:

- Replace only the `operations-vpc-routing-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Keep exactly 12 sections and exactly 3 follow-up objects per section.
- Use the 12 VPC routing surfaces as separate judgment axes: CIDR overlap, subnet route association, route table precedence, NAT port exhaustion, Internet Gateway public route, Transit Gateway propagation, Security Group vs NACL, NACL ephemeral return path, egress allowlist, Private Endpoint/PrivateLink DNS, VPC Flow Logs interpretation, and Reachability Analyzer/runbook handoff.
- Each primary answer must state the operating decision, first boundary or mechanism, failure mode, and evidence packet.
- Each follow-up answer must directly answer the question and include at least two of judgment criteria, failure mode, evidence artifact, and next action.
- Remove the target page's generated skeleton phrases and awkward Korean connector fragments.

Session 03 post-rewrite result:

- Rewrote only the `operations-vpc-routing-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Target count after generation: 12 `qa-*` sections and 36 follow-up answer rows in `public/handbook/operations-vpc-routing-qa-handbook.html`.
- The page now separates VPC routing surfaces by CIDR overlap, subnet route table association, route precedence, NAT port exhaustion, IGW public route, TGW propagation, SG/NACL behavior, NACL return path, egress allowlist, PrivateLink DNS, Flow Logs interpretation, and Reachability Analyzer handoff.
- Target generated output scan for `답변 깊이`, `경험 경계`, `판독 초점`, `단일 원인`, `내부 오류로 넘기기 전`, `조정를`, `확정로`, `끊김가`, `해석를`, `분산로`, `NAT gateway은`, `Private Endpoint은`, `입니다.내부`, and `주제는 입니다` returned no matches.

Human-read sample:

- `qa-1` reads as CIDR overlap triage. It fixes the first boundary as VPC/VPN/TGW CIDR readback plus route destination, then uses Flow Logs tuple evidence, route export snapshots, and IPAM follow-up rather than generic network wording.
- `qa-6` reads as Transit Gateway propagation handoff. It separates attachment association from propagation, names one-way route failure and over-propagation risks, and gives concrete TGW route table evidence and runbook actions.
- `qa-12` reads as Reachability Analyzer and runbook handoff. It requires exact Analyzer inputs, blocking component evidence, Flow Logs/probe cross-checking, and executable runbook handoff rather than a screenshot or generic completion note.

Session 03 verification:

- `node --check scripts/generate-operations-qa-handbooks.mjs`: pass
- `node scripts/generate-operations-qa-handbooks.mjs`: pass, regenerated 14 operations Q&A handbooks
- `npm run generate:handbook`: pass
- `npm test -- --test-name-pattern='operations Q&A handbooks'`: pass, 104 tests, 0 failures

## Session 04 - operations-security-boundary-qa Diagnosis

Scope: `operations-security-boundary-qa` only. Audited the current 12 sections and 36 follow-up answers in `scripts/generate-operations-qa-handbooks.mjs` and the generated `public/handbook/operations-security-boundary-qa-handbook.html` before editing.

Pre-rewrite verdict: severe/generated filler. The page has the required section and follow-up counts, but the security-boundary answers are mostly mechanical topic substitutions rather than distinct operational judgments.

Findings:

- The 12 section titles repeat the same `무엇을 먼저 보나요? 판독 축은 ...입니다` mold, and several mechanism pairings are wrong for the topic. Examples: security group is framed around secret rotation, secret rotation is framed around public exposure, and audit coverage is framed around admin session.
- The 36 follow-up answers repeatedly start with `판독 초점은 ...` and reuse a small set of answer skeletons: early readback, normal/risk split, follow-up cleanup, sample comparison, and recurrence device. Public ingress, IAM role, threat model, and containment answers differ mostly by inserted labels.
- Several follow-up answers do not directly answer the question. Examples: `security group 답변 깊이` evaluates egress allowlist drift instead of inbound/outbound rule boundaries; `IAM role 영향 확인` talks about session recording reachability rather than trust policy or assume-role failure; `threat model 답변 깊이` repeats internal-error wording instead of threat boundary evidence.
- Awkward generated Korean and banned strings are visible in the target output: `판독 초점은`, `답변 깊이`, `경험 경계`, `단일 원인`, `내부 오류로 넘기기 전`, `연결입니다.,`, `NACL 기준값`, `secret dual-read 기간을 짧게 운영입니다`, `secret dual-read 기간을 짧게 운영로`, and `ticket id 누락를`.
- Evidence is named but not operationally consumed. `IAM policy simulator`, `CloudTrail event`, `secret last rotated`, `security group diff`, `access analyzer finding`, and `session recording` appear without saying which field proves the boundary, which condition blocks approval, or what containment action follows.
- The page is missing distinct judgment axes for key security-boundary surfaces: public ingress exposure, CDN/WAF edge rule, Security Group boundary, NACL boundary, IAM trust policy, least privilege permission diff, secret rotation cutover, privileged admin access, egress/data-exfil path, audit/log integrity, threat model boundary, and incident isolation.

Session 04 rewrite plan:

- Replace only the `operations-security-boundary-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Keep exactly 12 sections and exactly 3 follow-up objects per section.
- Use the 12 security-boundary surfaces as separate judgment axes: public ingress exposure, CDN/WAF edge rule, Security Group boundary, NACL boundary, IAM role trust policy, least privilege permission diff, secret rotation cutover, privileged admin access, egress control/data exfil path, audit coverage/log integrity, threat model boundary, and incident containment/isolation.
- Each primary answer must state the operating decision, first security boundary or mechanism, failure mode, and evidence packet.
- Each follow-up answer must directly answer the question and include at least two of judgment criteria, failure mode, evidence artifact, and next action.
- Remove the target page's generated skeleton phrases and awkward Korean connector fragments.

Session 04 post-rewrite result:

- Rewrote only the `operations-security-boundary-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Target count after generation: 12 `qa-*` sections and 36 follow-up answer rows in `public/handbook/operations-security-boundary-qa-handbook.html`.
- The page now separates security-boundary surfaces by public ingress exposure, CDN/WAF edge rule, Security Group boundary, NACL boundary, IAM trust policy, least privilege diff, secret rotation cutover, privileged admin access, egress/data-exfil path, audit/log integrity, threat model boundary, and incident containment/isolation.
- Target generated output scan for `답변 깊이`, `경험 경계`, `판독 초점`, `단일 원인`, `내부 오류로 넘기기 전`, `조정를`, `확정로`, `끊김가`, `운영로`, `누락를`, `연결입니다.,`, `security group은 정상`, `NACL 기준값`, `secret dual-read 기간을 짧게 운영입니다`, `입니다.내부`, and `주제는 입니다` returned no matches.

Human-read sample:

- `qa-1` reads as public ingress exposure triage. It fixes the first boundary as DNS/CDN/load balancer/public route, distinguishes edge miss from app absence, and closes with external probe and listener/security rule evidence.
- `qa-6` reads as least privilege permission review. It uses policy diff, wildcard/resource/condition criteria, CloudTrail last accessed, simulator evidence, temporary policy expiry, and policy version pruning rather than generic authorization wording.
- `qa-12` reads as containment and isolation triage. It separates identity, network, workload, data store, and forensic snapshot actions, with explicit revoke/quarantine evidence and isolation exit checks.

Session 04 verification:

- `node --check scripts/generate-operations-qa-handbooks.mjs`: pass
- `node scripts/generate-operations-qa-handbooks.mjs`: pass, regenerated 14 operations Q&A handbooks

## Session 11 - operations-incident-dr-qa Diagnosis

Scope: `operations-incident-dr-qa` only. Audited 12 sections and 36 follow-up answers in `scripts/generate-operations-qa-handbooks.mjs`, plus the generated `public/handbook/operations-incident-dr-qa-handbook.html` and `src/handbook/documents/operations-incident-dr-qa.ts`, before editing.

Pre-rewrite verdict: severe/generated filler. The page has the required section and follow-up counts, but incident declaration, severity, incident commander, communication, mitigation, rollback, forward fix, restore validation, RPO/RTO, DR failover, postmortem, and action tracking are all forced into the same answer frame.

Findings:

- The 12 section titles all use the same mold: `무엇을 먼저 보나요? 판독 축은 ...입니다`. The titles do not express the different operating decisions in incident response and recovery.
- The 36 follow-up answers all contain `판독 초점`, and many reuse the same generated skeletons: normal sample comparison, normal/risk split, follow-up cleanup, and readback comparison.
- Target scans found the exact banned terms in the target scope: `무엇을 먼저 보나요? 판독 축은` 12 times, `판독 초점` 36 times, plus `답변 깊이`, `경험 경계`, `단일 원인`, `내부 오류로 넘기기 전`, `정상 선언를`, `incident timeline가`, and `forward fix은`.
- Several follow-up answers do not answer the question asked. Example: rollback answers talk about `postmortem owner` and missing customer impact count instead of rollback artifact, migration compatibility, traffic shift, or config revert criteria. DR failover answers repeat RPO/RTO readback but omit split brain, DNS or traffic switch, and failback criteria.
- Evidence is named but not operationally consumed. `incident timeline`, `status page update`, `backup restore log`, `decision record`, `restore point`, `postmortem action`, and `customer impact count` appear repeatedly without saying which field decides severity, who owns a decision, what blocks normal declaration, or what action follows.
- Awkward generated Korean is visible in source and generated output: `정상 선언를`, `incident timeline가`, `forward fix은`, and `read-only restore로 데이터 무결성 확인로`.

Session 11 rewrite plan:

- Replace only the `operations-incident-dr-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Keep exactly 12 sections and exactly 3 follow-up objects per section.
- Use the 12 incident/DR surfaces requested for this session: incident declaration, severity classification, commander handoff, communication/status update, mitigation before root cause, rollback choice, forward fix risk, restore drill/backup validation, RPO/RTO tracking, DR failover/failback, postmortem quality, and action item tracking.
- Each primary answer must state the operating decision, boundary or mechanism, concrete failure mode, and evidence packet.
- Each follow-up answer must directly answer its own question and include concrete criteria, failure mode, evidence, or next action.
- Regenerate public HTML and app document modules from the source generator, then run the target banned-phrase scan, count checks, operations Q&A test, and human-read samples for `qa-1`, `qa-6`, and `qa-12`.

Session 11 post-rewrite result:

- Rewrote only the `operations-incident-dr-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Target count after generation: 12 `qa-*` sections and 36 follow-up answer rows in `public/handbook/operations-incident-dr-qa-handbook.html`.
- The page now separates incident/DR surfaces by declaration criteria, severity classification, commander handoff, customer update cadence, mitigation before root cause, rollback/config/traffic choice, forward fix guardrails, restore validation, RPO/RTO tracking, DR failover/failback, postmortem quality, and action tracking.
- Target generated output scan for `답변 깊이`, `경험 경계`, `판독 초점`, `단일 원인`, `내부 오류로 넘기기 전`, `조정를`, `확정로`, `끊김가`, `열림를`, `정상 선언를`, `반복를`, `incident timeline가`, `forward fix은`, `주제는 입니다`, `입니다.내부`, and `무엇을 먼저 보나요? 판독 축은` returned no matches.

Human-read sample:

- `qa-1` reads as an incident declaration decision. It distinguishes alert-only watch from customer-impact declaration, names commander/scribe/technical/comms roles, and records non-declaration decisions with reevaluation criteria.
- `qa-6` reads as a rollback decision, not a generic recovery answer. It separates code rollback, config revert, feature flag off, and traffic shift using migration compatibility, artifact checksum, live config readback, capacity, and post-action SLI evidence.
- `qa-12` reads as action tracking closure. It requires alert replay, dry-run, access check, linked runbook/PR/catalog updates, owner sign-off, and overdue escalation rather than ticket closure alone.

Session 11 verification:

- `node --check scripts/generate-operations-qa-handbooks.mjs`: pass
- `node scripts/generate-operations-qa-handbooks.mjs`: pass, regenerated 14 operations Q&A handbooks
- `npm run generate:handbook`: pass
- Target banned phrase scan on `public/handbook/operations-incident-dr-qa-handbook.html` and `src/handbook/documents/operations-incident-dr-qa.ts`: pass, no matches
- Target count: 12 Q&A sections, 36 follow-up rows
- `npm test -- --test-name-pattern='operations Q&A handbooks'`: pass, 104 tests, 0 failures
- `npm run generate:handbook`: pass
- Target count check: 12 sections, 36 follow-up rows
- `npm test -- --test-name-pattern='operations Q&A handbooks'`: pass, 104 tests, 0 failures

## Session 12 - operations-checklist-interview-qa Diagnosis

Scope: `operations-checklist-interview-qa` only. Audited the current 12 sections and 36 follow-up answers in `scripts/generate-operations-qa-handbooks.mjs`, plus the generated `public/handbook/operations-checklist-interview-qa-handbook.html` and `src/handbook/documents/operations-checklist-interview-qa.ts`, before editing. Sessions 13-14 remain out of scope.

Pre-rewrite verdict: severe/generated filler. The page has the required section and follow-up counts, and follow-ups are explicit `{ q, answer }` objects, but the authored data still uses repeated generated molds rather than interview-specific evaluation guidance.

Findings:

- The 12 section titles repeat the same `무엇을 먼저 보나요? 판독 축은 ...입니다` mold. The titles do not separate the requested interview surfaces: answer structure, experience disclosure, command output reading, incident triage, recent change timeline, user impact, recovery criteria, evidence packet, unknown-topic response, cloud service boundaries, security response, and growth plan.
- The 36 follow-up answers repeatedly start with `판독 초점은 ...` and reuse initial-read, risk-split, and cleanup skeletons. Many answers differ mainly by inserted labels such as `verification packet`, `runbook excerpt`, `failure timeline`, or `follow-up question map`.
- Target scans found the requested banned strings in the target source and generated outputs: `답변 깊이`, `경험 경계`, `판독 초점`, `단일 원인`, `내부 오류로 넘기기 전`, `follow-up question map는`, `command output를`, `순서화로`, and `무엇을 먼저 보나요? 판독 축은`.
- Several follow-ups do not answer the exact question. Examples: command-output reading talks about generic `tradeoff note` and operational priority rather than output fields; user-impact review compares a vague experience boundary instead of cohort, SLO, business path, and blast radius; security answers discuss output automation instead of threat, control, evidence, tradeoff, and rollback.
- Awkward generated Korean is visible in source and generated output: `command output를`, `follow-up question map는`, `명령어 이름만 말하고 출력 판독 없음를`, `본 경험과 추론을 분리해 말함로`, and `순서화로`.
- Evidence is named but not operationally consumed. `command output`, `runbook excerpt`, `failure timeline`, `tradeoff note`, `verification packet`, and `follow-up question map` appear without saying which field changes the interviewer judgment, which answer failure mode it proves, or what next action follows.

Session 12 rewrite plan:

- Replace only the `operations-checklist-interview-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Keep exactly 12 sections and exactly 3 explicit `{ q, answer }` follow-up objects per section.
- Use the 12 requested interview-answer surfaces as separate judgment axes: structured incident answer, experience-scope disclosure, command output reading, incident triage, recent change timeline, user impact, recovery criteria, operations evidence packet, unknown-topic response, cloud service boundary answer, security answer, and operations growth plan.
- Each primary answer must state the evaluation decision, mechanism or boundary, concrete failure mode, and evidence packet.
- Each follow-up answer must directly answer its own question with question-specific judgment criteria, failure mode, evidence, or next action.
- Regenerate generated HTML and app documents from the source generator, then run the target forbidden-phrase scan, target count check, operations Q&A tests, and human-read samples for `qa-1`, `qa-6`, and `qa-12`.

Session 12 post-rewrite result:

- Rewrote only the `operations-checklist-interview-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Target count after generation: 12 `qa-*` sections and 36 follow-up answer rows in `public/handbook/operations-checklist-interview-qa-handbook.html`.
- The page now separates interview-answer surfaces by structured incident answer flow, experience-scope disclosure, command output field reading, triage and mitigation priority, recent change timeline, user-impact cohort analysis, recovery criteria, evidence packet construction, unknown-topic response, cloud service boundaries, security answer structure, and operations growth plan.
- Target generated output scan for `답변 깊이`, `경험 경계`, `판독 초점`, `단일 원인`, `내부 오류로 넘기기 전`, `조정를`, `확정로`, `끊김가`, `열림를`, `없음를`, `반복를`, `follow-up question map는`, `command output를`, `순서화로`, `주제는 입니다`, `입니다.내부`, and `무엇을 먼저 보나요? 판독 축은` returned no matches.

Human-read sample:

- `qa-1` reads as a structured incident-answer drill. It requires situation, user impact, first evidence, immediate action, and verification criteria, then distinguishes first 30-second response, hypothesis timing, and recovery closeout.
- `qa-6` reads as user-impact evaluation guidance. It separates affected cohort, SLO, business path, and blast radius, and requires cohort queries, support samples, business-path risk, mitigation logs, and SLO snapshots.
- `qa-12` reads as an operations growth plan, not generic self-improvement. It ties weakness diagnosis to drill, shadowing, runbook PRs, incident review actions, mentor feedback, and measurable reduction in future incident gaps.

Session 12 verification:

- `node --check scripts/generate-operations-qa-handbooks.mjs`: pass
- `node scripts/generate-operations-qa-handbooks.mjs`: pass, regenerated 14 operations Q&A handbooks
- `npm run generate:handbook`: pass
- Target forbidden phrase scan on `public/handbook/operations-checklist-interview-qa-handbook.html` and `src/handbook/documents/operations-checklist-interview-qa.ts`: pass, no matches
- Target count: 12 Q&A sections, 36 follow-up rows
- `npm test -- --test-name-pattern='operations Q&A handbooks'`: pass, 104 tests, 0 failures

## Session 05 - operations-dns-tls-qa Diagnosis

Scope: `operations-dns-tls-qa` only. Audited the current 12 sections and 36 follow-up answers in `scripts/generate-operations-qa-handbooks.mjs` and the generated `public/handbook/operations-dns-tls-qa-handbook.html` before editing.

Pre-rewrite verdict: severe/generated filler. The page has the required section and follow-up counts, but the DNS/TLS answers are still assembled from repeated topic labels rather than distinct domain operations judgments.

Findings:

- The 12 section titles repeat the same `무엇을 먼저 보나요? 판독 축은 ...입니다` mold, and several pairings are wrong for the topic. Examples: TTL is framed around CAA/SAN instead of propagation timing, resolver cache is framed around SAN/SNI instead of cache behavior, and domain transfer is framed around OCSP instead of registrar and nameserver cutover.
- The 36 follow-up answers repeatedly start with `판독 초점은 ...` and reuse the same early-readback, risk-split, and cleanup skeletons. Authoritative DNS, split-horizon DNS, CAA, SAN, SNI, chain, expiry, and domain transfer answers often differ only by inserted labels.
- Several follow-up answers do not directly answer the question. Examples: `TTL 조정 답변 깊이` talks about `openssl s_client` instead of TTL/cache propagation; `CAA record 답변 깊이` compares resolver log values but does not explain issuer authorization; `만료 알림 답변 깊이` discusses browser netlog rather than renewal lead time and alert ownership.
- Awkward generated Korean and banned strings are visible in the target output: `판독 초점은`, `답변 깊이`, `경험 경계`, `단일 원인`, `내부 오류로 넘기기 전`, `서로 다름를`, `전환로`, `확인로`, `반환를`, and `CAA record은`.
- Evidence is named but not operationally consumed. `dig +trace`, `resolver log`, `certificate transparency entry`, `openssl s_client`, `browser netlog`, and `HTTP host header trace` appear without saying which field proves the first DNS/TLS boundary, which failure mode it proves, or what next action follows.
- The page is missing distinct judgment axes for key DNS/TLS/domain surfaces: authoritative A/AAAA/CNAME answer, ALIAS/CNAME flattening, TTL/cache propagation, recursive resolver cache, split-horizon/private DNS, private DNS zone association, CAA issuer authorization, SAN coverage, SNI/Host routing, intermediate chain/OCSP, expiry alerting, and domain transfer/nameserver cutover.

Session 05 rewrite plan:

- Replace only the `operations-dns-tls-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Keep exactly 12 sections and exactly 3 follow-up objects per section.
- Use the 12 DNS/TLS/domain surfaces as separate judgment axes: authoritative A/AAAA/CNAME answer, ALIAS/CNAME flattening, TTL/cache propagation, recursive resolver cache, split-horizon/private DNS, private DNS zone association, CAA record and issuer authorization, certificate SAN coverage, SNI/Host routing, intermediate chain/OCSP, certificate expiry alerting, and domain transfer/nameserver cutover.
- Each primary answer must state the operating decision, first DNS/TLS boundary or mechanism, failure mode, and evidence packet.
- Each follow-up answer must directly answer the question and include at least two of judgment criteria, failure mode, evidence artifact, and next action.
- Remove the target page's generated skeleton phrases and awkward Korean connector fragments.

Session 05 post-rewrite result:

- Rewrote only the `operations-dns-tls-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Target count after generation: 12 `qa-*` sections and 36 follow-up answer rows in `public/handbook/operations-dns-tls-qa-handbook.html`.
- The page now separates DNS/TLS/domain surfaces by authoritative A/AAAA/CNAME answer, ALIAS/CNAME flattening, TTL/cache propagation, recursive resolver cache, split-horizon/private DNS, private DNS zone association, CAA issuer authorization, certificate SAN coverage, SNI/Host routing, intermediate chain/OCSP, certificate expiry alerting, and domain transfer/nameserver cutover.
- Target generated output scan for `답변 깊이`, `경험 경계`, `판독 초점`, `단일 원인`, `내부 오류로 넘기기 전`, `조정를`, `확정로`, `끊김가`, `서로 다름를`, `반환를`, `전환로`, `확인로`, `CAA record은`, `입니다.내부`, and `주제는 입니다` returned no matches.

Human-read sample:

- `qa-1` reads as authoritative DNS answer triage. It separates registrar delegation, authoritative nameserver, zone record set, recursive cache, IPv4/IPv6 evidence, and endpoint reachability rather than treating DNS as a generic request failure.
- `qa-6` reads as private DNS zone association review. It uses VPC/account association scope, resolver rules, public-name shadowing, canary lookup, association diff, and rollback evidence rather than certificate or OCSP wording.
- `qa-12` reads as domain transfer and nameserver cutover planning. It separates registrar transfer, registry delegation, DNSSEC, zone parity, resolver propagation, glue/MX/CAA/ACME records, and post-cutover trace evidence.

Session 05 verification:

- `node --check scripts/generate-operations-qa-handbooks.mjs`: pass
- `node scripts/generate-operations-qa-handbooks.mjs`: pass, regenerated 14 operations Q&A handbooks
- `npm run generate:handbook`: pass
- Target count check: 12 sections, 36 follow-up rows
- `npm test -- --test-name-pattern='operations Q&A handbooks'`: pass, 104 tests, 0 failures

## Session 06 - operations-private-connectivity-qa Diagnosis

Scope: `operations-private-connectivity-qa` only. Audited the current 12 sections and 36 follow-up answers in `scripts/generate-operations-qa-handbooks.mjs` and the generated `public/handbook/operations-private-connectivity-qa-handbook.html` before editing.

Pre-rewrite verdict: severe/generated filler. The page has the required 12 sections and 36 follow-up answers, but it is still built from repeated private-connectivity labels rather than distinct VPN, Direct Connect, routing, DNS, PrivateLink, packet evidence, and HA judgments.

Findings:

- The 12 section titles repeat the same `무엇을 먼저 보나요? 판독 축은 ...입니다` mold. Several topics are paired with the wrong mechanism: client VPN is framed around BGP advertisement, Direct Connect around MTU probe, PrivateLink around Direct Connect VLAN, and packet capture around customer firewall ownership rather than capture scope and tuple evidence.
- The 36 follow-up answers repeatedly start with `판독 초점은 ...` and reuse the same answer skeletons: early readback, risk split, follow-up cleanup, normal sample comparison, and recurrence device. The wording often differs only by topic substitution.
- Several answers do not directly answer the follow-up. Examples: `Direct Connect 답변 깊이` discusses MTU and customer firewall instead of physical/VIF/BGP state, `DNS forwarding 승인 차단` discusses MTU and route advertisement instead of resolver endpoints and rules, and `packet capture 답변 깊이` compares IKE proposal values rather than capture evidence.
- Awkward generated Korean and banned strings are visible in the target output: `판독 초점은`, `답변 깊이`, `경험 경계`, `단일 원인`, `내부 오류로 넘기기 전`, `축소 검증로`, `반복를`, `route priority은`, `packet capture은`, and `통과하고 실제 payload만 실패를`.
- Evidence is named but not operationally consumed. `BGP session state`, `tunnel log`, `packet capture`, `MTU probe`, `customer edge change ticket`, and `route advertisement` appear without saying which field proves the first private-connectivity boundary, which failure mode blocks a change, or what next action follows.
- The page is missing distinct judgment axes for key VPN/private connectivity surfaces: site-to-site VPN IKE/IPsec negotiation, client VPN authorization and routing, Direct Connect physical/VIF/BGP state, BGP prefix propagation, route priority and asymmetric routing, MTU/MSS fragmentation, customer gateway and firewall boundary, VPC peering limits, PrivateLink endpoint service/DNS/policy, DNS forwarding and Resolver endpoints, packet capture evidence, and tunnel failover/HA.

Session 06 rewrite plan:

- Replace only the `operations-private-connectivity-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Keep exactly 12 sections and exactly 3 follow-up objects per section.
- Use the 12 private connectivity surfaces as separate judgment axes: site-to-site VPN IKE/IPsec negotiation, client VPN authorization/routing, Direct Connect physical/VIF/BGP state, BGP prefix propagation, route priority/asymmetric routing, MTU/MSS fragmentation, customer gateway/firewall boundary, VPC peering route/SG/DNS limits, PrivateLink endpoint service/DNS/policy, DNS forwarding/Resolver endpoints, packet capture evidence, and tunnel failover/HA.
- Each primary answer must state the operating decision, first private-connectivity boundary or mechanism, failure mode, and evidence packet.
- Each follow-up answer must directly answer the question and include at least two of judgment criteria, failure mode, evidence artifact, and next action.
- Remove the target page's generated skeleton phrases and awkward Korean connector fragments.

Session 06 post-rewrite result:

- Rewrote only the `operations-private-connectivity-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Target count after generation: 12 `qa-*` sections and 36 follow-up answer rows in `public/handbook/operations-private-connectivity-qa-handbook.html`.
- The page now separates private-connectivity surfaces by site-to-site VPN IKE/IPsec negotiation, client VPN authorization/routing, Direct Connect physical/VIF/BGP state, BGP prefix propagation, route priority/asymmetric routing, MTU/MSS fragmentation, customer gateway/firewall boundary, VPC peering route/SG/DNS limits, PrivateLink endpoint service/DNS/policy, DNS forwarding/Resolver endpoints, packet capture evidence, and tunnel failover/HA.
- Target generated output scan for `답변 깊이`, `경험 경계`, `판독 초점`, `단일 원인`, `내부 오류로 넘기기 전`, `조정를`, `확정로`, `끊김가`, `축소 검증로`, `반복를`, `route priority은`, `packet capture은`, `통과하고 실제 payload만 실패를`, `입니다.내부`, and `주제는 입니다` returned no matches.

Human-read sample:

- `qa-1` reads as site-to-site VPN IKE/IPsec negotiation triage. It fixes the first boundary as phase 1/phase 2 proposal, PSK, peer IP, NAT-T/DPD, and uses SA state, byte counters, tunnel logs, and customer gateway logs to separate negotiation failure from routing or application symptoms.
- `qa-6` reads as MTU/MSS fragmentation triage. It connects small request success and large payload failure to VPN/IPsec overhead, PMTUD, DF-bit probing, MSS negotiation, ICMP policy, retransmission capture, and rollback evidence rather than generic tunnel health.
- `qa-12` reads as tunnel failover/HA operations guidance. It separates health events, BGP path preference, route next hop changes, DPD, automatic failback risk, drill evidence, and RTO-based runbook updates.

Session 06 verification:

- `node --check scripts/generate-operations-qa-handbooks.mjs`: pass
- `node scripts/generate-operations-qa-handbooks.mjs`: pass, regenerated 14 operations Q&A handbooks
- `npm run generate:handbook`: pass
- Target count check: 12 sections, 36 follow-up rows
- `npm test -- --test-name-pattern='operations Q&A handbooks'`: pass, 104 tests, 0 failures

## Session 07 - operations-delivery-pipeline-qa Diagnosis

Scope: `operations-delivery-pipeline-qa` only. Audited the current 12 sections and 36 follow-up answers in `scripts/generate-operations-qa-handbooks.mjs` and the generated `public/handbook/operations-delivery-pipeline-qa-handbook.html` before editing.

Pre-rewrite verdict: severe/generated filler. The page has the required section and follow-up counts, but CI/CD, artifact, environment, release gate, deployment strategy, observability marker, and runner-permission topics are still expressed through repeated generated frames.

Findings:

- The 12 section titles repeat the same `무엇을 먼저 보나요? 판독 축은 ...입니다` mold, so commit SHA, artifact digest, dependency lock, environment diff, secret injection, approval gate, smoke test, canary deploy, blue-green deploy, rollback command, deploy marker, and pipeline permission questions do not read as distinct operational decisions.
- The 36 follow-up answers repeatedly start with `판독 초점은 ...` and reuse the same early-readback, risk-split, and cleanup skeletons. Several answers differ mainly by inserted labels such as `build provenance`, `config diff`, `canary dashboard`, or `feature flag audit`.
- Several follow-ups do not answer the exact question. Examples: `dependency lock 답변 깊이` talks about feature flag variation instead of lockfile and transitive dependency risk; `deploy marker 답변 깊이` talks about runtime image digest reachability instead of observability correlation; `rollback command 승인 차단` discusses canary metric entry rather than separating artifact, config, and migration rollback.
- Awkward generated Korean and banned strings are visible in the target output: `판독 초점`, `답변 깊이`, `경험 경계`, `단일 원인`, `내부 오류로 넘기기 전`, `확정로`, `열림를`, `CI/CD은`, `Artifact은`, `Environment은`, and the title mold `무엇을 먼저 보나요? 판독 축은`.
- Evidence is named but not operationally consumed. `build provenance`, `deployment event`, `config diff`, `canary dashboard`, `runtime image digest`, and `feature flag audit` appear without saying which field proves identity, which condition blocks promotion, which rollback surface is safe, or which owner acts next.
- The page is missing distinct judgment axes for key release-pipeline surfaces: runtime commit identity, artifact digest/provenance/SBOM/signature, dependency lock and registry risk, staging/prod config drift, secret version and injection path, approval gate/change freeze, smoke or synthetic journey evidence, canary metric gates, blue-green cutover and state compatibility, separated rollback strategy, release markers in logs/metrics/traces, and CI runner trust boundaries.

Session 07 rewrite plan:

- Replace only the `operations-delivery-pipeline-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Keep exactly 12 sections and exactly 3 follow-up objects per section.
- Use the 12 delivery-pipeline surfaces as separate judgment axes: commit SHA/runtime release candidate identity, artifact digest/provenance, dependency lock/supply-chain risk, environment diff/config drift, secret injection, approval gate/change freeze, smoke test/synthetic journey, canary/progressive delivery, blue-green deploy, rollback command/revert strategy, deploy marker/observability correlation, and pipeline permission/runner isolation.
- Each primary answer must state the operating decision, mechanism or boundary, failure mode, and evidence packet.
- Each follow-up answer must directly answer the question and include concrete judgment criteria, failure mode, evidence artifact, and next action where relevant.
- Remove the target page's generated title mold, skeleton phrases, and awkward Korean connector fragments.

Session 07 post-rewrite result:

- Rewrote only the `operations-delivery-pipeline-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Target count after generation: 12 `qa-*` sections and 36 follow-up answer rows in `public/handbook/operations-delivery-pipeline-qa-handbook.html`.
- The page now separates delivery-pipeline surfaces by runtime commit identity, artifact digest/provenance/SBOM/signature, dependency lock and registry risk, staging/production config drift, secret version and injection path, approval gate/change freeze, smoke and synthetic journey, canary metric gates, blue-green cutover state, separated rollback strategy, deploy markers in observability, and CI runner isolation.
- Target generated output scan for `답변 깊이`, `경험 경계`, `판독 초점`, `단일 원인`, `내부 오류로 넘기기 전`, `조정를`, `확정로`, `끊김가`, `열림를`, `반복를`, `CI/CD은`, `Artifact은`, `Environment은`, `주제는 입니다`, `입니다.내부`, and `무엇을 먼저 보나요? 판독 축은` returned no matches.

Human-read sample:

- `qa-1` reads as runtime release candidate identity. It distinguishes Git tags from running workload metadata, handles mixed rolling replicas, and records corrected SHA, affected replica or region, and `/version` smoke follow-up.
- `qa-6` reads as approval gate and change-freeze control. It requires actual diff evidence, emergency exception scope, rollback owner, audit log review, and service-account/manual-approval separation rather than a generic approval statement.
- `qa-12` reads as pipeline permission and runner isolation guidance. It separates PR jobs from production deploy jobs, names OIDC and secret exposure boundaries, checks self-hosted runner isolation, and defines token rotation plus dry-run conditions before reopening deploys.

Session 07 verification:

- Pre-edit target banned-phrase scan: failed as expected, with repeated `판독 초점`, `답변 깊이`, `경험 경계`, `확정로`, `열림를`, and `무엇을 먼저 보나요? 판독 축은` matches in the target generated HTML/TS.
- `node --check scripts/generate-operations-qa-handbooks.mjs`: pass
- `node scripts/generate-operations-qa-handbooks.mjs`: pass, regenerated 14 operations Q&A handbooks
- `npm run generate:handbook`: pass
- Target banned-phrase scan on `public/handbook/operations-delivery-pipeline-qa-handbook.html` and `src/handbook/documents/operations-delivery-pipeline-qa.ts`: no matches
- Target count check: 12 sections, 36 follow-up rows
- `npm test -- --test-name-pattern='operations Q&A handbooks'`: pass, 104 tests, 0 failures

## Session 08 - operations-runtime-orchestration-qa Diagnosis

Scope: `operations-runtime-orchestration-qa` only. Audited the current 12 sections and 36 follow-up answers in `scripts/generate-operations-qa-handbooks.mjs` and the generated `public/handbook/operations-runtime-orchestration-qa-handbook.html` before editing. Neighboring sessions 09-14 remain out of scope for this worker.

Pre-rewrite verdict: severe/generated filler. The page has the required section and follow-up counts, but the runtime orchestration answers are still mostly templated substitutions rather than distinct operational judgments.

Findings:

- The 12 section titles repeat the same mold: `무엇을 먼저 보나요? 판독 축은 ...입니다`. The title text does not express the actual runtime decision, such as image identity verification, entrypoint crash separation, probe semantics, resource risk, rollout abort criteria, disruption budget, config staleness, or event/log ordering.
- All 36 follow-up answers reuse a small set of generated frames: `판독 초점은 ...`, early readback, normal/risk split, follow-up cleanup, and recurrence-device wording. The image digest, readiness, CPU throttling, OOMKilled, and runtime log sections are therefore interchangeable in structure.
- Several answers do not answer the exact follow-up. Examples: `readiness probe 답변 깊이` talks about HPA and PDB instead of traffic eligibility versus dependency health, `resource request 승인 차단` talks about rollout history instead of scheduler admission and throttling/OOM risk, and `runtime log 재발 봉쇄` points to liveness restart instead of building an event sequence from describe/events/logs.
- Awkward generated Korean and banned strings are visible in the target output: `판독 초점`, `답변 깊이`, `경험 경계`, `단일 원인`, `내부 오류로 넘기기 전`, `무엇을 먼저 보나요? 판독 축은`, `image digest은`, `HPA metric가`, and `몰림를`.
- Evidence is named but not consumed. `kubectl describe`, `container restart count`, `node pressure event`, `HPA metric`, `rollout status`, and `scheduler event` are listed without saying which field proves a boundary, which condition blocks rollout, or which mitigation follows.
- The page is missing distinct judgment axes for key runtime surfaces: runtime image digest, entrypoint/command crash, readiness traffic gate, liveness restart loop, startup probe window, request/limit scheduling risk, CPU throttling, OOMKilled/leak evidence, rollout strategy, PDB/node drain, ConfigMap/Secret reload, and chronological describe/events/log analysis.

Session 08 rewrite plan:

- Replace only the `operations-runtime-orchestration-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Keep exactly 12 sections and exactly 3 follow-up objects per section.
- Use the 12 runtime orchestration surfaces as separate judgment axes: image digest/runtime image identity, entrypoint/command crash, readiness probe, liveness probe, startup probe, resource request/limit, CPU throttling, OOMKilled/memory leak, rolling update strategy, PDB/pod disruption/node drain, config reload/Secret/ConfigMap update, and runtime log/events.
- Each primary answer must state the operating decision, the runtime mechanism or boundary, a concrete failure mode, and the evidence packet.
- Each follow-up answer must directly answer its own question and include concrete judgment criteria, failure mode, evidence, or next action.
- Remove the target page's generated title mold, repeated follow-up skeletons, and awkward Korean connector fragments.

Session 08 post-rewrite result:

- Rewrote only the `operations-runtime-orchestration-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Target count after generation: 12 `qa-*` sections and 36 follow-up answer rows in `public/handbook/operations-runtime-orchestration-qa-handbook.html`.
- The page now separates runtime orchestration surfaces by image digest identity, entrypoint/command start failure, readiness traffic gate, liveness restart loop, startup window, resource request/limit risk, CPU throttling, OOMKilled/leak evidence, rolling update strategy, PDB/node drain, config reload, and ordered describe/events/log analysis.
- Target HTML and TS scan for `답변 깊이`, `경험 경계`, `판독 초점`, `단일 원인`, `내부 오류로 넘기기 전`, `조정를`, `확정로`, `끊김가`, `열림를`, `몰림를`, `반복를`, `image digest은`, `HPA metric가`, `주제는 입니다`, `입니다.내부`, and `무엇을 먼저 보나요? 판독 축은` returned no matches.

Human-read sample:

- `qa-1` reads as runtime image identity triage. It uses pod `imageID`, deployment template image, registry manifest digest, rollout revision, and admission/deploy evidence to distinguish mutable tags, node cache, multi-arch manifests, and mixed ReplicaSets.
- `qa-6` reads as resource request/limit review. It explains scheduler admission, QoS, node allocatable, cgroup CPU/memory behavior, Pending risk, throttling risk, OOM risk, canary comparison, and capacity review closure.
- `qa-12` reads as runtime event chronology. It orders describe output, namespace events, previous/current logs, rollout revision, and node condition evidence into a timeline, then separates app log causes from kubelet-stage failures.

Session 08 verification:

- `node --check scripts/generate-operations-qa-handbooks.mjs`: pass
- `node scripts/generate-operations-qa-handbooks.mjs`: pass, regenerated 14 operations Q&A handbooks
- `npm run generate:handbook`: pass
- Target forbidden phrase scan on `public/handbook/operations-runtime-orchestration-qa-handbook.html` and `src/handbook/documents/operations-runtime-orchestration-qa.ts`: pass, no matches
- Target count: 12 Q&A sections, 36 follow-up rows
- `npm test -- --test-name-pattern='operations Q&A handbooks'`: pass, 104 tests, 0 failures

## Session 09 - operations-iac-change-qa Diagnosis

Scope: `operations-iac-change-qa` only. Audited the current 12 sections and 36 follow-up answers in `scripts/generate-operations-qa-handbooks.mjs`, plus the generated `public/handbook/operations-iac-change-qa-handbook.html` and `src/handbook/documents/operations-iac-change-qa.ts`, before editing. Sessions 10-14 remain out of scope.

Pre-rewrite verdict: severe/generated filler. The page has the required 12 sections and 36 follow-up answers, but the IaC answers are mechanically assembled and do not make distinct operating decisions for plan review, state, provider/module upgrades, drift, import, moved blocks, destructive changes, approval, artifacts, or post-apply verification.

Findings:

- The 12 section titles repeat the same question mold: `무엇을 먼저 보나요? 판독 축은 ...입니다`. That hides the actual IaC decision, such as whether a replacement is acceptable, who owns a stale lock, whether a module refactor would destroy resources, or whether a console hotfix should be absorbed into code.
- The 36 follow-up answers reuse the same generated frames around `판독 초점`, early readback, risk split, cleanup, and recurrence wording. Terraform plan, state locking, provider version, module version, drift detection, console hotfix, import block, moved block, destructive change, change window, plan review, and apply readback therefore feel interchangeable.
- Several answers do not answer the exact follow-up. Examples: provider version answers discuss moved blocks instead of changelog and schema migration risk; import block answers discuss state locks instead of resource address mapping and zero-diff confirmation; change window answers talk about average indicators instead of freeze status, approver identity, rollback owner, and approval evidence.
- Awkward generated Korean and banned strings are visible in the target output: `판독 초점`, `답변 깊이`, `경험 경계`, `단일 원인`, `내부 오류로 넘기기 전`, `apply approval는`, `terraform plan가`, `불명확를`, `확정로`, and `무엇을 먼저 보나요? 판독 축은`.
- Evidence is listed but not used as proof. `terraform plan`, `state lock record`, `drift report`, `provider changelog`, `apply approval`, `state history`, and `remote state` appear as labels without saying which field changes the decision, which failure mode blocks apply, or which readback closes the incident.
- The page is missing distinct judgment axes for the requested IaC surfaces: plan action classification and blast radius, remote state and locking, provider upgrade, module upgrade, drift detection, console hotfix reconciliation, import, moved block refactor, destructive-change guardrails, change window and approval, plan review artifacts, and post-apply readback.

Session 09 rewrite plan:

- Replace only the `operations-iac-change-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Keep exactly 12 sections and exactly 3 explicit `{ q, answer }` follow-up objects per section.
- Use the 12 IaC surfaces as separate judgment axes: Terraform plan action reading, state locking and remote state, provider version upgrade, module version upgrade, drift detection, console hotfix reconciliation, import block/state import, moved block refactor, destructive change guardrail, change window/apply approval, plan review artifact, and apply readback/post-apply verification.
- Each primary answer must state the operating decision, mechanism or boundary, concrete failure mode, and evidence packet.
- Each follow-up answer must directly answer its own question with topic-specific criteria, failure modes, evidence, or next action.
- Regenerate generated HTML and app documents from the source generator, then run the target forbidden-phrase scan, target count check, operations Q&A tests, and human-read samples for `qa-1`, `qa-6`, and `qa-12`.

Session 09 post-rewrite result:

- Rewrote only the `operations-iac-change-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Target count after generation: 12 `qa-*` sections and 36 follow-up answer rows in `public/handbook/operations-iac-change-qa-handbook.html`.
- The page now separates IaC and change-management surfaces by Terraform plan action/blast radius, state locking and remote state safety, provider changelog and schema migration, module interface and address changes, drift classification, console hotfix reconciliation, import and zero-diff confirmation, moved block refactor safety, destructive-change guardrails, change window and approval control, saved plan artifacts, and post-apply cloud/app readback.
- Target HTML and TS scan for `답변 깊이`, `경험 경계`, `판독 초점`, `단일 원인`, `내부 오류로 넘기기 전`, `조정를`, `확정로`, `끊김가`, `열림를`, `불명확를`, `반복를`, `apply approval는`, `terraform plan가`, `주제는 입니다`, `입니다.내부`, and `무엇을 먼저 보나요? 판독 축은` returned no matches.

Human-read sample:

- `qa-1` reads as Terraform plan action triage. It separates create/update/delete/replace, names approval-stopping resource classes, explains replace blast radius, and requires saved plan hash, action count, approval scope, and variable evidence.
- `qa-6` reads as console hotfix reconciliation. It distinguishes absorbing a recovery change into code from reverting a risky bypass, then closes on code PR, zero-diff or intended-diff plan, cloud readback, incident metric recovery, and console permission cleanup.
- `qa-12` reads as post-apply verification. It rejects state-only success, requires cloud API and app smoke readback, handles propagation and partial failure, and records state serial, changed resources, metrics, drift, and follow-up work.

Session 09 verification:

- Pre-edit target banned-phrase scan: failed as expected, with repeated generated title and answer frames in the target HTML/TS and source page object.
- `node --check scripts/generate-operations-qa-handbooks.mjs`: pass
- `node scripts/generate-operations-qa-handbooks.mjs`: pass, regenerated 14 operations Q&A handbooks
- `npm run generate:handbook`: pass
- Target forbidden phrase scan on `public/handbook/operations-iac-change-qa-handbook.html` and `src/handbook/documents/operations-iac-change-qa.ts`: pass, no matches
- Target count: 12 Q&A sections, 36 follow-up rows
- `npm test -- --test-name-pattern='operations Q&A handbooks'`: pass, 104 tests, 0 failures

## Session 10 - operations-observability-slo-qa Diagnosis

Scope: `operations-observability-slo-qa` only. Audited the current 12 sections and 36 follow-up answers in `scripts/generate-operations-qa-handbooks.mjs`, plus the generated `public/handbook/operations-observability-slo-qa-handbook.html` and `src/handbook/documents/operations-observability-slo-qa.ts`, before editing. Sessions 11-14 remain out of scope.

Pre-rewrite verdict: severe/generated filler. The page has the required 12 sections and 36 follow-up answers, but the Observability/SLO content still reads like mechanical phrase substitution rather than distinct SLI, SLO, alerting, metrics, tracing, logging, dashboard, routing, synthetic, RUM, and postmortem operations guidance.

Findings:

- The 12 section titles repeat the same mold: `무엇을 먼저 보나요? 판독 축은 ...입니다`. The titles do not express concrete decisions such as whether a user-journey SLI matches the actual collection point, whether a target change should consume error budget, or whether a burn-rate alert should page.
- The 36 follow-up answers repeatedly start with `판독 초점은 ...` and reuse the same generated frames: early readback, normal/risk split, cleanup, recurrence device, and average-metric warnings. SLI definition, error budget, RED, USE, trace sampling, log cardinality, dashboard design, and RUM therefore feel interchangeable.
- Several answers do not answer the exact follow-up. Examples: `RED metric 영향 확인` discusses paging route reachability instead of separating request rate, error rate, and duration; `USE metric 승인 차단` talks about alert routing instead of utilization/saturation/errors; `dashboard 설계 영향 확인` talks about `log query plan` reproducibility instead of incident layout and drill-down paths.
- Awkward generated Korean and banned strings are visible in the target output: `판독 초점`, `답변 깊이`, `경험 경계`, `단일 원인`, `내부 오류로 넘기기 전`, `log query plan가`, `dashboard 설계은`, `없음를`, `분리로`, and `무엇을 먼저 보나요? 판독 축은`.
- Evidence is listed but not used as proof. `SLO dashboard`, `alert evaluation log`, `trace exemplar`, `log query plan`, `probe result`, and `paging route` appear as labels without saying which field changes the decision, which condition blocks release, which incident action follows, or which owner must act.
- The page is missing distinct judgment axes for the requested Observability/SLO surfaces: SLI definition and source of truth, SLO target and error-budget policy, multi-window burn-rate alerting, RED metrics, USE metrics, trace sampling/exemplars, log cardinality and query cost, dashboard design, alert routing and escalation, synthetic checks, RUM/client telemetry, and observability-gap postmortems.

Session 10 rewrite plan:

- Replace only the `operations-observability-slo-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Keep exactly 12 sections and exactly 3 explicit `{ q, answer }` follow-up objects per section.
- Use the 12 Observability/SLO surfaces as separate judgment axes: SLI source of truth, SLO target/error-budget policy, multi-window burn-rate alert, RED metrics, USE metrics, trace sampling/exemplars, log cardinality/query cost, incident dashboard design, alert routing/escalation, synthetic checks, RUM/client telemetry, and observability-gap postmortem actions.
- Each primary answer must state the operating decision, mechanism or boundary, concrete failure mode, and evidence packet.
- Each follow-up answer must directly answer its own question with topic-specific criteria, failure modes, evidence, or next action.
- Regenerate generated HTML and app documents from the source generator, then run the target forbidden-phrase scan, target count check, operations Q&A tests, and human-read samples for `qa-1`, `qa-6`, and `qa-12`.

Session 10 post-rewrite result:

- Rewrote only the `operations-observability-slo-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Target count after generation: 12 `qa-*` sections and 36 follow-up answer rows in `public/handbook/operations-observability-slo-qa-handbook.html`.
- The page now separates Observability/SLO surfaces by SLI source of truth, SLO target and error-budget policy, multi-window burn-rate alerting, RED metrics, USE metrics, trace sampling and exemplars, log cardinality and query cost, incident dashboard design, alert routing and escalation, synthetic checks, RUM/client telemetry, and observability-gap postmortem actions.
- Target HTML and TS scan for `답변 깊이`, `경험 경계`, `판독 초점`, `단일 원인`, `내부 오류로 넘기기 전`, `조정를`, `확정로`, `끊김가`, `열림를`, `없음를`, `반복를`, `log query plan가`, `dashboard 설계은`, `주제는 입니다`, `입니다.내부`, and `무엇을 먼저 보나요? 판독 축은` returned no matches.

Human-read sample:

- `qa-1` reads as SLI source-of-truth guidance. It checks whether the user journey, collection point, numerator, denominator, dedup rule, raw events, and dashboard query all agree, and it names how client/RUM/synthetic evidence can reveal an SLI that hides user pain.
- `qa-6` reads as trace sampling and exemplar operations guidance. It separates tail sampling from head sampling, names failure-preservation criteria, covers collector drop and propagation-header failure, and requires metric-to-trace-to-log linking evidence.
- `qa-12` reads as observability-gap postmortem closure. It classifies missing signals, route failures, dashboard interpretation gaps, and owner gaps, then requires owner, due date, PR or alert replay evidence, runbook diff, and drill verification.

Session 10 verification:

- `node --check scripts/generate-operations-qa-handbooks.mjs`: pass
- `node scripts/generate-operations-qa-handbooks.mjs`: pass, regenerated 14 operations Q&A handbooks
- `npm run generate:handbook`: pass
- Target forbidden phrase scan on `public/handbook/operations-observability-slo-qa-handbook.html` and `src/handbook/documents/operations-observability-slo-qa.ts`: pass, no matches
- Target count: 12 Q&A sections, 36 follow-up rows
- `npm test -- --test-name-pattern='operations Q&A handbooks'`: pass, 104 tests, 0 failures

## Session 13 - operations-cloud-scenarios-qa Diagnosis

Scope: `operations-cloud-scenarios-qa` only. Audited the current 12 sections and 36 follow-up answers in `scripts/generate-operations-qa-handbooks.mjs`, plus the generated `public/handbook/operations-cloud-scenarios-qa-handbook.html` and `src/handbook/documents/operations-cloud-scenarios-qa.ts`, before editing. Sessions 01-12 are already complete, and Session 14 remains out of scope.

Pre-rewrite verdict: severe/generated filler. The page has the required 12 sections and 36 follow-up answers, but AWS/Azure cloud scenarios are forced through the same generated frames instead of distinct region, zone, quota, database, storage, load balancing, autoscaling, cost, identity, audit, outage, and architecture tradeoff judgments.

Findings:

- The 12 section titles repeat the same mold: `무엇을 먼저 보나요? 판독 축은 ...입니다`. This hides the actual cloud decision, such as region fit, zone failure behavior, quota lead time, managed database failover, object storage exposure, or control-plane outage mitigation.
- The 36 follow-up answers repeatedly start with `판독 초점은 ...` and reuse the same early-readback, risk-split, cleanup, normal-sample, and recurrence-device skeletons. Region, multi-AZ, quota, object storage, IAM, and architecture tradeoff answers therefore read as topic substitution.
- Target source and generated output contain the exact banned terms requested for this session: `판독 초점`, `답변 깊이`, `경험 경계`, `단일 원인`, `내부 오류로 넘기기 전`, `service quota은`, `managed DB 장애 장애`, `따라오지 않음를`, `분리로`, and `무엇을 먼저 보나요? 판독 축은`.
- Several follow-up answers do not answer the specific question. Examples: `service quota` answers discuss managed failover and cost anomaly instead of SKU/instance limits, API throttling, quota-increase lead time, and capacity ceilings. `cloud audit log` answers discuss cost anomaly rather than control-plane evidence retention and tamper risk. `architecture tradeoff` answers discuss service limits rather than managed versus self-managed operational burden.
- Evidence is named but not consumed. `service health event`, `quota dashboard`, `billing anomaly`, `regional metric`, `support case`, and `cloud audit event` are listed without saying which field changes the decision, what failure mode blocks approval, or what next action follows.
- Awkward Korean and connector fragments are visible in the target content: `service quota은`, `managed DB 장애 장애`, `지역별 metric과 service health를 분리`, `managed service failover 뒤 DNS가 따라오지 않음를`, and generic `주제는 ...입니다` setup sentences.

Session 13 rewrite plan:

- Replace only the `operations-cloud-scenarios-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Keep exactly 12 sections and exactly 3 explicit `{ q, answer }` follow-up objects per section.
- Use the 12 requested cloud scenario surfaces as separate judgment axes: region selection and regional health, multi-AZ/zone redundancy, service quota and capacity ceiling, managed DB failover, object storage policy, load balancer path, autoscaling, cost anomaly, IAM/identity boundary, cloud audit log, provider outage/control-plane lag, and architecture tradeoff.
- Each primary answer must state the operating decision, the control-plane/data-plane/quota/cost/security/region boundary involved, a concrete failure mode, and evidence that changes the decision.
- Each follow-up answer must directly answer its own question with scenario-specific judgment criteria, failure mode, evidence, and next action where relevant.
- Regenerate generated HTML and app documents from the source generator, then run the target forbidden-phrase scan, target count check, operations Q&A tests, and human-read samples for `qa-1`, `qa-6`, and `qa-12`.

Session 13 post-rewrite result:

- Rewrote only the `operations-cloud-scenarios-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Target count after generation: 12 `qa-*` sections and 36 follow-up answer rows in `public/handbook/operations-cloud-scenarios-qa-handbook.html`.
- The page now separates cloud scenario surfaces by region selection/regional health, zone redundancy, quota and capacity ceilings, managed DB failover, object storage policy, load balancer path, autoscaling, cost anomaly triage, IAM and managed identity boundaries, audit log evidence, provider outage/control-plane lag, and managed versus self-managed architecture tradeoffs.
- Target HTML and TS scan for `답변 깊이`, `경험 경계`, `판독 초점`, `단일 원인`, `내부 오류로 넘기기 전`, `조정를`, `확정로`, `끊김가`, `열림를`, `따라오지 않음를`, `반복를`, `service quota은`, `managed DB 장애 장애`, `주제는 입니다`, `입니다.내부`, and `무엇을 먼저 보나요? 판독 축은` returned no matches.
- Source target object scan for the same banned phrases returned no matches inside `operations-cloud-scenarios-qa`.

Human-read sample:

- `qa-1` reads as region selection guidance. It does not stop at closest latency; it weighs data residency, service availability, quota, service health, failover candidate regions, and when control-plane health differs from data-plane impact.
- `qa-6` reads as load balancer path triage. It separates L7 and L4 evidence, listener rules, TLS/SNI, health probes, target drain, synthetic user paths, and rollback listener criteria rather than treating all 5xx as backend failures.
- `qa-12` reads as architecture tradeoff guidance. It compares managed service and self-managed responsibilities, lock-in, portability, runbook/on-call burden, quota and region limits, cost model, and exit conditions.

Session 13 verification:

- `node --check scripts/generate-operations-qa-handbooks.mjs`: pass
- `node scripts/generate-operations-qa-handbooks.mjs`: pass, regenerated 14 operations Q&A handbooks
- `npm run generate:handbook`: pass
- Target forbidden phrase scan on `public/handbook/operations-cloud-scenarios-qa-handbook.html` and `src/handbook/documents/operations-cloud-scenarios-qa.ts`: pass, no matches
- Target count: 12 Q&A sections, 36 follow-up rows
- `npm test -- --test-name-pattern='operations Q&A handbooks'`: pass, 104 tests, 0 failures

## Session 14 - operations-ai-llm-operations-qa Diagnosis

Scope: `operations-ai-llm-operations-qa` only. Audited the current 12 sections and 36 follow-up answers in `scripts/generate-operations-qa-handbooks.mjs`, plus the generated `public/handbook/operations-ai-llm-operations-qa-handbook.html` and `src/handbook/documents/operations-ai-llm-operations-qa.ts`, before editing. Sessions 01-13 are treated as existing work and remain out of scope.

Pre-rewrite verdict: severe/generated filler. The page has the required count, but the AI/LLM operations topics are still forced through repeated answer molds instead of distinct decisions for routing, token budgets, latency, retries, prompts, structured output, eval gates, fallback, provider outages, safety, privacy, and cost.

Findings:

- The 12 section titles repeat the mold `무엇을 먼저 보나요? 판독 축은 ...입니다`. This hides the actual operating decision, such as routing a request to a provider, deciding whether context truncation is user-visible, setting a retry budget, or blocking a release on eval regression.
- The 36 follow-up answers repeatedly begin with `판독 초점은 ...` and reuse early-readback, risk-split, cleanup, normal-sample, and recurrence-device frames. `model gateway`, `eval gate`, `fallback model`, `PII redaction`, and `cost dashboard` therefore read as topic substitutions.
- Target source and generated output contain the exact low-quality markers requested for this session: `답변 깊이`, `경험 경계`, `판독 초점`, `단일 원인`, `내부 오류로 넘기기 전`, `model gateway은`, `eval gate은`, `묶음로`, `사용를`, and `무엇을 먼저 보나요? 판독 축은`.
- Several answers do not answer the specific follow-up. Examples: `latency SLO 답변 깊이` talks about prompt cache before checking model latency, queueing, streaming, timeout, or p95/p99; `eval gate` answers repeat model gateway evidence instead of offline/online eval thresholds; `cost dashboard` answers discuss redaction and schema samples instead of token ledger, per-feature cost, anomaly, and guardrail evidence.
- Evidence is listed but not consumed. `model call trace`, `schema error sample`, `fallback decision log`, `token usage ledger`, `evaluation replay`, and `redaction audit` appear as labels without saying which field changes the decision, which failure mode blocks rollout, or which next action follows.
- Awkward Korean and connector fragments are visible in the target content: `routing 결정을 묶음입니다`, `prompt cache hit가 오래된 정책을 사용를`, `fallback 기준을 사용자 영향별로 분리로`, `schema 실패가 사용자 오류로 포장됨를`, `model gateway은 정상 판정`, and generic `주제는 ...입니다` setup sentences.

Session 14 rewrite plan:

- Replace only the `operations-ai-llm-operations-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Keep exactly 12 sections and exactly 3 explicit `{ q, answer }` follow-up objects per section.
- Use the 12 requested AI/LLM operations surfaces as separate judgment axes: model gateway/routing, token budget/context truncation, latency SLO, retry budget/rate limits, prompt version/cache, schema validation/structured output, eval gate, fallback model, provider outage, safety policy/filter, PII redaction/data retention, and cost dashboard/token accounting.
- Each primary answer must state the operating decision, boundary or mechanism, concrete failure mode, and evidence packet.
- Each follow-up answer must directly answer its own question with LLM-specific judgment criteria, failure mode, evidence, and next action where relevant.
- Regenerate generated HTML and app documents from the source generator, then run the target forbidden-phrase scan, target count check, operations Q&A tests, and human-read samples for `qa-1`, `qa-6`, and `qa-12`.

Session 14 post-rewrite result:

- Rewrote only the `operations-ai-llm-operations-qa` page object in `scripts/generate-operations-qa-handbooks.mjs`.
- Target count after generation: 12 `qa-*` sections and 36 follow-up answer rows in `public/handbook/operations-ai-llm-operations-qa-handbook.html`.
- The page now separates AI/LLM operations surfaces by model gateway routing, token budget and context truncation, latency SLO, retry and rate-limit budgets, prompt version and cache, schema validation and structured output, eval gate release blocking, fallback model quality tradeoffs, provider outage failover, safety policy/filter decisions, PII redaction/data retention, and cost/token accounting.
- Target HTML and TS scan for `답변 깊이`, `경험 경계`, `판독 초점`, `단일 원인`, `내부 오류로 넘기기 전`, `조정를`, `확정로`, `끊김가`, `열림를`, `포장됨를`, `사용를`, `반복를`, `model gateway은`, `eval gate은`, `묶음로`, `주제는 입니다`, `입니다.내부`, and `무엇을 먼저 보나요? 판독 축은` returned no matches.
- Source target object scan for the same banned phrases returned no matches inside `operations-ai-llm-operations-qa`.

Human-read sample:

- `qa-1` reads as model gateway and routing triage. It separates route log absence from provider call failure, checks tenant policy and residency tags, and closes with route id, provider id, model version, data boundary, kill switch, and trace evidence.
- `qa-6` reads as structured-output contract guidance. It separates raw model output failures from parser/repair failures, limits repair to safe format errors, defines user-visible error handling, and records raw output, validation path, repair result, and contract version evidence.
- `qa-12` reads as cost and token accounting operations guidance. It traces anomaly causes across feature, tenant, model, provider, retry, cache, and invoice boundaries, then applies guardrails and closes on extra token count, extra spend, recovered run rate, and ledger reconciliation.

Session 14 verification:

- `node --check scripts/generate-operations-qa-handbooks.mjs`: pass
- `node scripts/generate-operations-qa-handbooks.mjs`: pass, regenerated 14 operations Q&A handbooks
- `npm run generate:handbook`: pass
- Target forbidden phrase scan on `public/handbook/operations-ai-llm-operations-qa-handbook.html` and `src/handbook/documents/operations-ai-llm-operations-qa.ts`: pass, no matches
- Target source object forbidden phrase scan: pass, no matches
- Target count: 12 Q&A sections, 36 follow-up rows
- `npm test -- --test-name-pattern='operations Q&A handbooks'`: pass, 104 tests, 0 failures

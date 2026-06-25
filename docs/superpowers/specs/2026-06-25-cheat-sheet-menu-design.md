# Cheat Sheet Menu Design

## Goal

Add a new top-level `Cheat Sheet` menu to the handbook. The section should provide fast reference pages for common development domains and tools, without duplicating the long-form handbook pages.

The first version should be practical and compact. It should help users quickly recall commands, decision criteria, common mistakes, and short interview/review-ready explanations.

## Navigation Design

Add `Cheat Sheet` as a new top-level menu group.

Recommended position:

1. 홈
2. 기술면접
3. 백엔드
4. 프론트엔드
5. 네트워크 인프라
6. DevOps
7. AX
8. 디자인
9. Cheat Sheet
10. 예시 사례
11. 실무 가이드

This keeps long-form handbook sections first, then places quick-reference material before examples and practical guides.

## Initial Menu Items

Create these initial child pages under `Cheat Sheet`:

1. `cheat-frontend` - `Frontend`
2. `cheat-backend` - `Backend`
3. `cheat-database` - `Database`
4. `cheat-network` - `Network`
5. `cheat-devops` - `DevOps`
6. `cheat-linux` - `Linux`
7. `cheat-docker` - `Docker`
8. `cheat-interview` - `Interview`

This is a hybrid structure. It keeps the existing domain model visible while splitting out highly reusable reference topics such as Database, Linux, and Docker.

## Page Template

Each Cheat Sheet page should use the same compact structure:

```txt
개요
- When to use this page.
- What this page helps distinguish.

핵심 명령/개념
- Short bullets or tables.
- Prefer high-signal examples over long explanation.

판단 기준
- When to choose one option over another.
- Trade-offs that commonly matter in real work.

자주 나는 실수
- Mistakes that cause production, interview, or review problems.

면접/리뷰용 한 줄 답변
- Short phrases that can be reused in interviews, code reviews, and technical discussions.
```

Pages should remain scan-friendly. Avoid turning them into another full handbook chapter.

## Content Scope

### Frontend Cheat Sheet

Cover rendering, state boundaries, performance, accessibility, frontend security, and testing.

Expected sections:

- Rendering pipeline and React rendering terms.
- Client state vs server state.
- CSR, SSR, SSG, and hydration checks.
- Core Web Vitals and common optimization levers.
- Accessibility checks for forms, navigation, focus, and semantics.
- Common frontend security risks such as XSS, CSRF, token storage, and dependency risk.
- Testing pyramid for components, integration flows, and end-to-end checks.

### Backend Cheat Sheet

Cover API design, validation, authentication, authorization, transactions, async processing, and idempotency.

Expected sections:

- REST API design and response contract checks.
- Validation split between client and server.
- Authentication vs authorization.
- Session, JWT, RBAC, and ABAC comparison.
- Transaction boundaries and locking basics.
- Async processing, retry, timeout, and idempotency key patterns.

### Database Cheat Sheet

Cover SQL, indexes, execution plans, transactions, isolation, and migrations.

Expected sections:

- Join, grouping, filtering, and pagination reminders.
- Index selection and common index mistakes.
- Execution plan terms to inspect first.
- Isolation levels and lock symptoms.
- Migration safety checklist.
- Backup, rollback, and data verification reminders.

### Network Cheat Sheet

Cover request flow, DNS, TCP, TLS, HTTP, CIDR, routing, NAT, firewall, and debugging commands.

Expected sections:

- Browser-to-server request flow.
- DNS lookup, TCP handshake, TLS handshake, and HTTP request roles.
- CIDR, subnet, public/private routing, NAT, and gateway terms.
- Security group, firewall, and NACL comparison.
- Debugging commands such as `dig`, `nslookup`, `curl`, `traceroute`, `ping`, `nc`, and `ss`.

### DevOps Cheat Sheet

Cover CI/CD, deployment, rollback, observability, secrets, IaC, and operational checks.

Expected sections:

- CI vs CD responsibilities.
- Build, test, deploy, promote, and rollback flow.
- Blue-green, rolling, and canary deployment comparison.
- Logs, metrics, traces, RED, USE, and Golden Signals.
- Secret handling and environment configuration checks.
- IaC review and drift detection reminders.

### Linux Cheat Sheet

Cover file, process, network, permission, log, and system inspection commands.

Expected sections:

- File navigation and text inspection.
- Process and port inspection.
- Permissions and ownership.
- Disk, memory, CPU, and service checks.
- Log search and incident triage commands.

### Docker Cheat Sheet

Cover images, containers, networks, volumes, Compose, builds, and debugging.

Expected sections:

- Image vs container mental model.
- Build, run, exec, logs, inspect, and prune commands.
- Port mapping and network checks.
- Volume and bind mount behavior.
- Docker Compose lifecycle.
- Common build cache and runtime debugging issues.

### Interview Cheat Sheet

Cover answer structure and quick response patterns.

Expected sections:

- 30-second, 90-second, and 3-minute answer frames.
- How to answer when experience is direct, partial, or conceptual.
- Follow-up question handling.
- How to handle unknown questions.
- Common overclaiming and vague-answer mistakes.
- Short reusable answer openers for architecture, trade-off, failure, and debugging questions.

## Architecture

The implementation should follow the current handbook architecture:

- Add a `CHEAT_SHEETS` collection in `src/handbook/catalog.mjs`.
- Add a `Cheat Sheet` group to `HANDBOOK_GROUPS`.
- Include all cheat sheet items in `HANDBOOK_ITEMS`.
- Add document loaders for each new document id in `src/handbook/documentLoaders.ts`.
- Create one document module per cheat sheet under `src/handbook/documents`.

No new routing system is needed. The existing active item state, desktop dropdown, mobile accordion, previous/next navigation, and document rendering path can support the new group.

## Data Flow

Selecting a Cheat Sheet item should follow the existing flow:

1. User selects a menu item.
2. `activeId` changes in `App.tsx`.
3. `HandbookPage` receives the selected item.
4. The matching loader in `HANDBOOK_DOCUMENT_LOADERS` imports the document module.
5. `HandbookPage` renders `navHtml` and `mainHtml`.

## Error Handling

Use the existing missing-document behavior. If a loader is missing or import fails, the page displays `선택한 문서를 찾을 수 없습니다.`

The implementation should avoid partial catalog entries without loaders, because those create broken menu items.

## Testing

Verification should include:

- TypeScript/build check.
- Existing handbook HTML test, if applicable.
- Manual navigation check for desktop menu and mobile menu behavior.
- Confirm every new Cheat Sheet id has a matching loader and document module.
- Confirm each new document has non-empty `navHtml` and `mainHtml`.

## Out of Scope

The first version should not add search, tagging, favorites, copy buttons for every command, or a separate routing model.

Those can be considered later if the cheat sheet section becomes large enough to need stronger discovery.

import type { JiraBlock } from "./LessonContent";

const h = (text: string): JiraBlock => ({ type: "heading", level: 2, text });
const p = (text: string): JiraBlock => ({ type: "paragraph", text });
const bullets = (...items: string[]): JiraBlock => ({ type: "bullets", items });
const ordered = (...items: string[]): JiraBlock => ({ type: "ordered", items });
const code = (text: string): JiraBlock => ({ type: "code", text });
const table = (rows: string[][]): JiraBlock => ({ type: "table", rows });

export const unixSystemExamDrills: Record<string, JiraBlock[]> = {
  "TODO-27": [
    h("구조를 한 번에 잡기"), table([["구성요소", "역할", "예"], ["하드웨어", "CPU·메모리·장치", "x86-64, SSD"], ["커널", "프로세스·메모리·파일·장치 관리", "Linux kernel"], ["셸", "명령 해석과 조합", "bash, zsh"], ["유틸리티", "사용자 작업 수행", "ls, grep, cp"], ["배포판", "커널+도구+패키지 정책", "Ubuntu, Fedora"]]),
    h("시험형 개념"), bullets("UNIX는 운영체제 계열과 설계 전통, Linux는 UNIX 계열 인터페이스를 따르는 독립 커널이다.", "다중 사용자와 다중 작업은 여러 사용자의 여러 프로세스를 보호·스케줄링한다는 뜻이다.", "POSIX는 UNIX 계열에서 프로그램과 명령 인터페이스의 이식성을 높이는 표준이다.", "GPL은 소스 공개만 뜻하지 않고 재배포 시 같은 자유를 유지하도록 요구하는 카피레프트 라이선스다."),
    h("기출형 확인문제와 해설"), ordered("사용자가 입력한 ls를 해석하는 구성요소는? → 셸이다. 실제 파일 읽기 시스템 호출과 장치 관리는 커널이 담당한다.", "Ubuntu와 Linux의 관계는? → Ubuntu는 Linux 커널과 GNU 도구·패키지 관리자를 묶은 배포판이다.", "커널과 셸 중 교체하기 쉬운 사용자 인터페이스는? → 셸이며 한 시스템에 여러 셸을 설치할 수 있다.")
  ],
  "TODO-28": [
    h("설치 전 설계"), table([["항목", "확인할 내용"], ["CPU/가상화", "64비트·VT-x/AMD-V 지원"], ["저장장치", "파티션과 여유 공간"], ["펌웨어", "UEFI/Legacy, Secure Boot"], ["네트워크", "NAT·브리지·호스트 전용"], ["계정", "root 직접 사용 최소화·sudo 사용자"]]),
    h("파티션과 마운트 이해"), p("파티션은 저장장치의 논리 구획이고 파일시스템은 그 구획에 파일을 조직하는 형식이다. Linux는 C: 같은 드라이브 문자가 아니라 파일시스템을 /, /home 같은 디렉터리에 마운트한다. 스왑은 메모리 압박 시 사용할 디스크 영역이며 RAM의 단순 대체가 아니다."),
    h("설치 확인 명령"), code("uname -r                 # 커널 릴리스\ncat /etc/os-release       # 배포판 정보\nlsblk -f                  # 블록장치·파일시스템·마운트 위치\nip address                # 네트워크 인터페이스와 주소\ndf -h                     # 마운트된 파일시스템 사용량"),
    h("기출형 확인문제와 해설"), ordered("가상머신 NAT 모드의 특징은? → 게스트가 호스트를 통해 외부 통신하며 외부에서 게스트로 직접 접근하려면 포트 전달이 필요할 수 있다.", "설치 이미지의 무결성은 어떻게 확인하는가? → 배포처가 제공한 SHA256 체크섬과 계산값을 비교한다.", "/home을 별도 파일시스템으로 두는 장점은? → 시스템 재설치·용량 정책에서 사용자 데이터를 분리하기 쉽다.")
  ],
  "TODO-29": [
    h("셸 처리 순서"), p("Bash는 입력을 토큰화하고 인용을 해석한 뒤 중괄호·틸드·매개변수·명령·산술 확장, 단어 분리, 파일명 확장 등을 수행해 명령과 인수를 만든다. 작은따옴표는 내부 확장을 모두 막고, 큰따옴표는 변수·명령 치환은 허용하지만 단어 분리와 글로빙을 막는다."),
    h("파이프와 리다이렉션"), code("grep 'ERROR' app.log | sort | uniq -c > error-count.txt\n# |  : 왼쪽 표준출력을 오른쪽 표준입력으로\n# >  : 표준출력 덮어쓰기, >> : 이어쓰기\n# 2> : 표준에러 리다이렉션\n# 2>&1 : 표준에러를 현재 표준출력과 같은 곳으로"),
    table([["표현", "결과"], [">out 2>&1", "stdout을 out으로, stderr도 그곳으로"], ["2>&1 >out", "stderr는 변경 전 stdout, stdout만 out으로"], ["cmd1 && cmd2", "cmd1 성공 시 cmd2"], ["cmd1 || cmd2", "cmd1 실패 시 cmd2"], ["cmd1 ; cmd2", "성공 여부와 무관하게 순서대로"]]),
    h("기출형 확인문제와 해설"), ordered("name='a b'일 때 rm $name과 rm \"$name\"의 차이는? → 전자는 단어 분리로 a와 b 두 인수, 후자는 'a b' 한 인수다.", "PATH에 현재 디렉터리가 없을 때 현재 스크립트 실행법은? → ./script.sh처럼 경로를 명시한다.", "$(date)와 '$((1+2))' 중 확장되는 것은? → 작은따옴표 안에서는 둘 다 확장되지 않는다.")
  ],
  "TODO-30": [
    h("경로와 링크"), table([["개념", "핵심"], ["절대 경로", "/에서 시작해 위치와 무관"], ["상대 경로", "현재 작업 디렉터리 기준"], ["하드 링크", "같은 inode를 가리키는 다른 이름"], ["심볼릭 링크", "대상 경로 문자열을 저장하는 별도 파일"]]),
    h("안전한 파일 관리"), code("mkdir -p project/src\ncp -a source/ backup/          # 속성 보존 재귀 복사\nmv old.txt new.txt\nfind . -type f -name '*.bak' -print\n# 확인한 뒤에만 삭제:\nfind . -type f -name '*.bak' -delete"),
    h("명령 구분"), bullets("cp는 원본을 남기고 복사, mv는 이름·위치를 바꾼다.", "rmdir는 빈 디렉터리만 제거하며 rm -r은 하위 항목까지 제거한다.", "head -n 5는 앞 5줄, tail -n 5는 뒤 5줄, tail -f는 추가 내용을 계속 관찰한다.", "file은 확장자가 아니라 내용의 매직 정보 등을 보고 형식을 추정한다.", "숨김 파일은 이름이 점(.)으로 시작하며 ls -a로 본다."),
    h("기출형 확인문제와 해설"), ordered("하드 링크 하나를 삭제하면 원본 데이터도 사라지는가? → inode 링크 수가 0이고 열린 참조도 없을 때 비로소 해제된다.", "심볼릭 링크가 다른 파일시스템을 가리킬 수 있는가? → 가능하다. 하드 링크는 일반적으로 파일시스템 경계를 넘지 못한다.", "현재 디렉터리의 부모는? → ..이며 현재 디렉터리는 .이다.")
  ],
  "TODO-31": [
    h("부팅 흐름"), ordered("펌웨어 BIOS/UEFI가 하드웨어를 초기화하고 부트 대상을 선택한다.", "부트로더(GRUB)가 커널과 initramfs를 메모리에 적재한다.", "커널이 장치·메모리를 초기화하고 루트 파일시스템을 준비한다.", "PID 1인 systemd가 유닛 의존성을 따라 서비스와 로그인 환경을 시작한다."),
    h("systemd 핵심"), code("systemctl status sshd\nsudo systemctl start sshd\nsudo systemctl enable --now sshd   # 부팅 자동 시작 + 즉시 시작\nsystemctl get-default\nsudo systemctl isolate multi-user.target\njournalctl -u sshd --since today"),
    table([["명령", "차이"], ["systemctl start", "현재 부팅에서 시작"], ["systemctl enable", "다음 부팅 자동 시작 링크 구성"], ["systemctl stop", "현재 서비스 중지"], ["systemctl disable", "자동 시작 해제"], ["shutdown -r now", "안전하게 종료 절차 후 재부팅"]]),
    h("기출형 확인문제와 해설"), ordered("enable한 서비스가 즉시 시작되는가? → 기본적으로 아니다. --now를 함께 쓰거나 start가 필요하다.", "PID 1의 주 역할은? → 사용자 공간 초기화와 서비스·자식 프로세스 관리다.", "전원 버튼 강제 종료보다 shutdown이 안전한 이유는? → 서비스 종료, 버퍼 기록, 파일시스템 언마운트를 수행한다.")
  ],
  "TODO-32": [
    h("계정 데이터베이스"), table([["파일", "내용"], ["/etc/passwd", "사용자명·UID·GID·홈·로그인 셸"], ["/etc/shadow", "비밀번호 해시·만료 정책; 제한 접근"], ["/etc/group", "그룹명·GID·보조 구성원"], ["/etc/gshadow", "그룹 비밀번호·관리 정보"]]),
    h("사용자와 그룹 관리"), code("sudo useradd -m -s /bin/bash alice\nsudo passwd alice\nsudo usermod -aG developers alice\nid alice\ngetent passwd alice\nsudo userdel -r alice"),
    p("usermod -G developers alice에서 -a를 빠뜨리면 기존 보조 그룹 목록을 대체할 수 있다. 파일 접근 검사에는 프로세스의 유효 UID/GID와 보조 그룹이 사용된다. root의 UID는 0이며 sudo는 허가된 명령에 한해 권한을 위임한다."),
    h("기출형 확인문제와 해설"), ordered("기본 그룹과 보조 그룹의 차이는? → 새 파일의 기본 그룹 등에 쓰이는 주 그룹은 하나, 추가 권한을 주는 보조 그룹은 여러 개 가능하다.", "/etc/passwd에 비밀번호 해시를 직접 두지 않는 이유는? → 많은 프로그램이 읽어야 하는 파일과 민감한 해시를 분리하기 위해서다.", "UID와 사용자명 중 커널이 소유권에 사용하는 것은? → 숫자 UID/GID다.")
  ],
  "TODO-33": [
    h("Vi의 모드"), table([["모드", "진입 예", "역할"], ["일반", "Esc", "이동·삭제·복사·붙이기"], ["입력", "i, a, o", "텍스트 입력"], ["명령행", ":, /, ?", "저장·종료·검색·치환"], ["비주얼", "v, V", "범위 선택"]]),
    h("시험에 나오는 조작"), code("i        # 커서 앞 입력      a       # 커서 뒤 입력\ndd       # 한 줄 삭제        yy      # 한 줄 복사\np        # 뒤에 붙이기        u       # 실행 취소\n/text    # 아래로 검색        n       # 다음 결과\n:%s/old/new/g               # 전체 치환\n:wq      # 저장 후 종료       :q!     # 저장 없이 종료"),
    h("정규식 기초"), bullets("^는 줄 시작, $는 줄 끝, .은 임의 한 문자다.", "[abc]는 집합 중 한 문자, [^abc]는 그 밖의 한 문자다.", "기본 정규식과 확장 정규식에서 +, ?, |의 이스케이프 규칙이 다를 수 있다.", "grep -E는 확장 정규식을, grep -F는 정규식이 아닌 고정 문자열을 사용한다."),
    h("기출형 확인문제와 해설"), ordered("저장하지 않고 강제 종료하는 명령은? → :q!이다.", "현재 줄 전체를 복사해 다음 줄에 붙이는 키는? → yy 후 p다.", "빈 줄을 찾는 정규식은? → ^$이다.")
  ],
  "TODO-34": [
    h("디스크에서 파일까지"), ordered("디스크 또는 가상 블록장치를 파티션한다.", "필요하면 PV→VG→LV로 LVM 논리 볼륨을 만든다.", "mkfs로 파일시스템을 생성한다.", "mount로 디렉터리에 연결한다.", "/etc/fstab에 영구 마운트 설정을 작성하고 mount -a로 검증한다."),
    h("공간 명령과 inode"), table([["명령/개념", "정답 포인트"], ["df", "파일시스템 전체 사용량"], ["du", "파일·디렉터리가 차지하는 사용량"], ["inode", "파일 형식·권한·소유자·크기·블록 주소; 이름 제외"], ["fsck", "언마운트된 파일시스템 검사·복구"], ["mount", "파일시스템을 디렉터리 트리에 연결"]]),
    h("권한 계산"), code("r=4, w=2, x=1\nchmod 754 report.sh\n# 소유자 rwx(7), 그룹 r-x(5), 기타 r--(4)\n\n일반 파일 기본 후보 666, 디렉터리 777\numask 027 → 파일 640, 디렉터리 750"),
    p("umask는 단순 뺄셈이 아니라 기본 후보 권한에서 해당 비트를 마스킹한다. 디렉터리의 x는 ‘실행’보다 내부 이름을 통과·접근할 수 있는 탐색 권한이다. 파일 삭제 권한은 파일 자체보다 부모 디렉터리의 w+x에 좌우된다."),
    h("기출형 확인문제와 해설"), ordered("chmod 640의 기호 표현은? → rw-r-----이다.", "df에는 여유가 있는데 새 파일 생성이 실패할 수 있는 이유는? → inode가 고갈되었을 수 있다.", "LVM의 확장 순서는? → 물리 볼륨을 볼륨 그룹에 묶고 논리 볼륨을 만든 뒤 파일시스템을 생성·확장한다.")
  ],
  "TODO-35": [
    h("프로세스와 작업 제어"), table([["개념", "범위"], ["프로세스", "커널이 관리하는 실행 인스턴스, PID 보유"], ["작업(job)", "현재 셸이 관리하는 파이프라인 단위"], ["Ctrl+C", "포어그라운드 작업에 SIGINT"], ["Ctrl+Z", "SIGTSTP로 일시 정지"], ["&, bg, fg", "백그라운드 시작·재개·전환"]]),
    h("관찰과 시그널"), code("ps -ef\nps aux\ntop\nkill -TERM 1234       # 정상 종료 기회 제공\nkill -KILL 1234       # 잡을 수 없는 강제 종료; 마지막 수단\nnice -n 10 command   # 더 큰 nice 값 = 낮은 CPU 우선순위\nrenice 5 -p 1234"),
    h("cron 계산"), code("# 분 시 일 월 요일 명령\n30 2 * * 1-5 /home/me/backup.sh\n# 평일(월~금) 매일 02:30 실행\n\n*/10 * * * * command\n# 10분마다 실행"),
    h("기출형 확인문제와 해설"), ordered("SIGKILL과 SIGTERM 중 먼저 시도할 것은? → 정리 기회를 주는 SIGTERM이다.", "nice 값이 10에서 15로 커지면? → CPU 우선순위가 낮아진다.", "좀비 프로세스란? → 종료했지만 부모가 종료 상태를 회수(wait)하지 않아 프로세스 테이블 항목이 남은 상태다.", "cron과 at의 차이는? → cron은 반복, at은 지정 시각의 일회 실행이다.")
  ],
  "TODO-36": [
    h("패키지 관리 계층"), table([["계열", "저수준", "의존성 포함 고수준"], ["Debian/Ubuntu", "dpkg", "apt"], ["RHEL/Fedora", "rpm", "dnf"], ["Arch", "pacman", "pacman"]]),
    h("APT 실습 흐름"), code("sudo apt update              # 저장소 메타데이터 갱신\napt search nginx\napt show nginx\nsudo apt install nginx\napt list --upgradable\nsudo apt remove nginx\nsudo apt purge nginx           # 설정까지 제거"),
    p("패키지는 프로그램 파일, 메타데이터, 의존성, 설치·제거 스크립트를 묶는다. 저장소는 서명된 메타데이터로 출처와 무결성을 확인한다. update는 패키지 목록 갱신이고 upgrade는 설치된 패키지 버전을 실제로 올린다."),
    h("소스 빌드와 공유 라이브러리"), bullets("전형적 순서는 configure 또는 cmake → make → 테스트 → install이다.", "컴파일 시 헤더, 링크 시 라이브러리 기호, 실행 시 공유 라이브러리 탐색이 각각 실패할 수 있다.", "ldd는 실행 파일의 공유 라이브러리 의존성을 확인한다.", "배포판 패키지 관리자 밖에서 /usr에 직접 설치하면 추적·업데이트가 어려워질 수 있다."),
    h("기출형 확인문제와 해설"), ordered("apt update가 프로그램을 최신 버전으로 설치하는가? → 아니다. 저장소 목록만 갱신한다.", "rpm -q와 rpm -i의 차이는? → 전자는 조회, 후자는 설치다.", "의존성 해결에 더 적합한 계층은? → apt/dnf 같은 고수준 도구다.")
  ],
  "TODO-37": [
    h("실행 방식과 프로세스"), table([["실행", "셸", "현재 셸 변수 영향"], ["bash script.sh", "새 Bash", "종료 후 사라짐"], ["./script.sh", "shebang 해석기", "종료 후 사라짐"], ["source script.sh", "현재 셸", "변수·디렉터리 변경 유지"]]),
    h("안전한 기본 골격"), code("#!/usr/bin/env bash\nset -u\n\nusage() { printf '사용법: %s FILE\\n' \"$0\" >&2; }\n\nif (( $# != 1 )); then usage; exit 2; fi\nfile=$1\nif [[ ! -f $file ]]; then printf '파일 없음: %s\\n' \"$file\" >&2; exit 1; fi\nprintf '줄 수: %s\\n' \"$(wc -l < \"$file\")\""),
    h("특수 매개변수"), table([["표현", "의미"], ["$0", "스크립트 이름"], ["$1…$9", "위치 인수"], ["$#", "인수 개수"], ["$@", "모든 인수; \"$@\"는 경계 보존"], ["$?", "직전 명령 종료 상태"], ["$$", "현재 셸 PID"]]),
    h("기출형 확인문제와 해설"), ordered("name = value가 틀린 이유는? → 대입의 = 양옆에 공백을 둘 수 없다.", "\"$*\"와 \"$@\" 차이는? → 전자는 모든 인수를 한 문자열, 후자는 각 인수를 별도 문자열로 보존한다.", "종료 상태 0의 의미는? → 관례적으로 성공이다.")
  ],
  "TODO-38": [
    h("조건식 선택"), table([["구문", "용도"], ["[[ ... ]]", "Bash 문자열·파일·패턴 조건"], ["(( ... ))", "정수 산술 조건"], ["case", "문자열 패턴 다중 분기"], ["test 또는 [ ]", "POSIX 조건식"]]),
    h("반복과 입력"), code("#!/usr/bin/env bash\nwhile IFS= read -r line; do\n  [[ -z $line ]] && continue\n  printf '%s\\n' \"$line\"\ndone < input.txt\n\nfor file in \"$@\"; do\n  [[ -f $file ]] || { printf '건너뜀: %s\\n' \"$file\" >&2; continue; }\n  wc -l -- \"$file\"\ndone"),
    h("확장과 오류 처리"), bullets("변수는 특별한 이유가 없으면 \"$var\"처럼 인용한다.", "read -r은 백슬래시를 이스케이프로 소비하지 않는다.", "명령 성공 여부는 if command; then처럼 직접 검사할 수 있다.", "trap 'cleanup' EXIT로 정상·오류 종료 시 정리 작업을 등록할 수 있다.", "set -e는 모든 오류를 단순 해결하지 않으며 조건문·파이프라인 예외를 이해해야 한다."),
    h("기출형 확인문제와 해설"), ordered("숫자 비교에서 [[ $a < $b ]]를 쓰면? → 문자열 사전식 비교다. 산술은 (( a < b ))를 사용한다.", "파일 존재와 일반 파일 여부를 함께 확인하는 연산자는? → -e는 존재, -f는 일반 파일이다.", "파이프 중 앞 명령 실패까지 잡으려면? → Bash에서 set -o pipefail을 고려한다.")
  ],
  "TODO-39": [
    h("Git의 세 영역"), table([["영역", "설명", "확인/이동"], ["작업 트리", "실제 편집 파일", "git diff"], ["스테이징 영역", "다음 커밋 스냅샷", "git diff --staged, git add"], ["저장소", "커밋 객체와 참조", "git log, git commit"]]),
    h("기본 흐름"), code("git init\ngit status\ngit add README.md\ngit diff --staged\ngit commit -m 'docs: add README'\ngit log --oneline --graph --decorate\n\n# 추적 파일 변경과 새 파일을 구분해서 status로 확인"),
    p("Git은 파일 차이 목록만이 아니라 프로젝트 스냅샷을 커밋 객체로 저장한다. 커밋은 트리, 부모 커밋, 작성자·커미터, 메시지를 가리킨다. HEAD는 보통 현재 브랜치 참조를, 브랜치는 특정 커밋을 가리키는 이동 가능한 포인터다."),
    h("기출형 확인문제와 해설"), ordered("git add 후 다시 파일을 수정하면? → 스테이징에는 add 당시 내용, 작업 트리에는 추가 수정이 있어 두 diff가 모두 생긴다.", "git status의 untracked는? → 작업 트리에 있지만 아직 Git이 추적하지 않는 파일이다.", ".gitignore에 추가하면 이미 추적 중인 파일도 자동으로 사라지는가? → 아니다. 추적 해제 작업이 별도로 필요하다.")
  ],
  "TODO-40": [
    h("브랜치와 HEAD"), code("git switch -c feature/login   # 생성 후 전환\ngit branch --show-current\ngit log --oneline --graph --all\ngit switch main\ngit merge feature/login\ngit branch -d feature/login"),
    h("병합 판단"), table([["상태", "결과"], ["main 이후 feature만 전진", "fast-forward 가능"], ["공통 조상 뒤 양쪽 모두 커밋", "3-way 병합·병합 커밋 가능"], ["같은 내용의 충돌 변경", "자동 병합 중단·수동 해결"], ["다른 파일 또는 비겹침 변경", "대개 자동 병합"]]),
    h("충돌 해결"), ordered("git status로 충돌 파일을 확인한다.", "<<<<<<<, =======, >>>>>>> 표시를 보고 원하는 최종 내용으로 편집한다.", "테스트 후 git add로 해결됨을 표시한다.", "git commit 또는 git merge --continue로 완료한다.", "취소하려면 해결 중 git merge --abort를 사용한다."),
    h("기출형 확인문제와 해설"), ordered("fast-forward에서 새 병합 커밋이 반드시 생기는가? → 아니다. 브랜치 포인터만 앞으로 이동한다.", "브랜치를 삭제하면 커밋도 즉시 삭제되는가? → 다른 참조와 reflog가 가리킬 수 있으며 즉시 객체가 없어지지 않는다.", "HEAD가 분리된 상태란? → 브랜치가 아니라 특정 커밋을 직접 가리키는 상태다.")
  ],
  "TODO-41": [
    h("stash"), code("git stash push -m 'WIP: login'\ngit stash list\ngit stash show -p stash@{0}\ngit stash apply stash@{0}   # 적용 후 항목 유지\ngit stash pop               # 적용 성공 시 항목 제거\ngit stash drop stash@{0}"),
    h("되돌리기 도구 비교"), table([["명령", "무엇을 바꾸나", "공유 이력"], ["git restore file", "작업 트리 파일 복원", "커밋 생성 안 함"], ["git restore --staged file", "스테이징 해제", "커밋 생성 안 함"], ["git revert C", "C의 반대 변경 새 커밋", "안전"], ["git reset --soft C", "브랜치만 이동·변경은 staged", "비공개 이력"], ["git reset --mixed C", "브랜치+index 이동·변경은 unstaged", "비공개 이력"], ["git reset --hard C", "브랜치+index+작업 트리", "변경 유실 위험"]]),
    h("상태 시나리오"), bullets("공유 원격에 이미 올린 잘못된 커밋은 revert로 상쇄한다.", "아직 공유하지 않은 최근 커밋을 다시 만들 때 reset을 고려한다.", "작업 중 긴급 브랜치 전환에는 stash를 쓰되 커밋 대용 장기 보관소로 쓰지 않는다.", "reflog는 로컬 참조 이동 기록으로 실수한 reset 뒤 커밋을 찾는 데 도움 된다."),
    h("기출형 확인문제와 해설"), ordered("apply와 pop 차이는? → apply는 stash를 남기고 pop은 성공적으로 적용하면 제거한다.", "revert가 공개 이력에 안전한 이유는? → 기존 커밋을 지우지 않고 반대 변경 커밋을 추가한다.", "reset --hard의 위험은? → 커밋뿐 아니라 스테이징과 작업 트리의 추적 변경까지 덮어쓸 수 있다.")
  ]
};

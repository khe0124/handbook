import type { JiraEntry } from "./LessonContent";

const official = "https://press.knou.ac.kr/goods/textBookView.do?condCmdtCode=9788920035197&condLscValue=001";
const kocw = "https://kocw.net/home/m/search/kemView.do?ar=relateCourse&kemId=1410058";
const heading = (text: string) => ({ type: "heading" as const, level: 2, text });
const paragraph = (text: string) => ({ type: "paragraph" as const, text });
const bullets = (...items: string[]) => ({ type: "bullets" as const, items });
const tasks = (...items: string[]) => ({ type: "tasks" as const, items });
const code = (text: string) => ({ type: "code" as const, text });
const table = (rows: string[][]) => ({ type: "table" as const, rows });
const sources = paragraph(`기준 자료: 방송대 출판문화원 C프로그래밍 ${official}\n보조 강의: KOCW C프로그래밍언어 심화 ${kocw}`);
const entry = (summary: string, blocks: JiraEntry["blocks"]): JiraEntry => ({ summary, status: "완료", blocks: [...blocks, heading("참고 자료"), sources] });

export const cProgrammingContent: Record<string, JiraEntry> = {
  "TODO-57": entry("1회차 · C 언어의 개요", [
    heading("C 언어와 프로그램 번역 과정"), paragraph("C는 절차적·구조적 프로그래밍 언어로 운영체제와 임베디드부터 일반 응용까지 폭넓게 사용된다. 소스 파일(.c)은 전처리→컴파일→어셈블→링크를 거쳐 실행 파일이 된다. 컴파일 오류는 문법·자료형 문제, 링크 오류는 정의를 찾지 못한 함수나 전역 기호 문제, 실행 오류는 잘못된 메모리 접근처럼 실행 중 발생하는 문제다."),
    table([["단계", "입력→출력", "하는 일"], ["전처리", ".c→확장 소스", "#include, #define 처리"], ["컴파일", "소스→어셈블리", "문법·자료형 검사와 번역"], ["어셈블", "어셈블리→목적 파일", "기계어 생성"], ["링크", ".o+라이브러리→실행 파일", "외부 기호 결합"]]),
    heading("기본 구조"), code("#include <stdio.h>\n\nint main(void) {\n  printf(\"Hello, C!\\n\");\n  return 0;\n}"),
    bullets("main은 프로그램 진입점이며 int를 반환한다.", "문장은 세미콜론으로 끝나고 블록은 중괄호로 묶는다.", "식별자는 대소문자를 구분하며 키워드를 이름으로 쓸 수 없다.", "경고도 잠재 오류로 보고 -Wall -Wextra 옵션으로 확인한다."),
    heading("직접 실행"), code("cc -std=c11 -Wall -Wextra hello.c -o hello\n./hello"),
    tasks("빌드 네 단계를 순서대로 설명할 수 있다.", "컴파일 오류와 링크 오류를 구분할 수 있다.", "main과 printf가 포함된 프로그램을 작성·실행할 수 있다.")
  ]),
  "TODO-58": entry("2회차 · 자료형과 선행처리기", [
    heading("상수·변수·자료형"), paragraph("변수는 이름이 붙은 저장 공간이고 자료형은 값의 범위, 메모리 크기, 가능한 연산을 정한다. char, short, int, long, long long과 unsigned 조합, float, double, long double이 기본 산술형이다. 정확한 크기는 구현마다 다를 수 있으므로 sizeof와 <stdint.h>의 int32_t 등을 활용한다."),
    table([["표현", "의미"], ["42, 052, 0x2A", "10·8·16진 정수 상수"], ["3.14, 3.14f", "double·float 상수"], ["'A', '\\n'", "문자와 이스케이프 문자"], ["const int n=10", "프로그램에서 변경하지 않을 객체"]]),
    heading("선언과 변환"), code("#include <stdio.h>\n#include <stdint.h>\n\nint main(void) {\n  int count = 3;\n  double total = 10.0;\n  double average = total / count; /* int가 double로 변환 */\n  printf(\"%.2f, int32=%zu bytes\\n\", average, sizeof(int32_t));\n}"),
    heading("전처리기"), code("#include <stdio.h>\n#define SQUARE(x) ((x) * (x))\n#define BUFFER_SIZE 256\n\n#ifdef DEBUG\n#define TRACE(msg) fprintf(stderr, \"%s\\n\", (msg))\n#else\n#define TRACE(msg) ((void)0)\n#endif"),
    bullets("함수형 매크로의 인수와 전체 식에 괄호를 넣는다.", "SQUARE(i++)처럼 부작용 있는 식을 매크로 인수로 넘기지 않는다.", "헤더 중복 포함은 include guard로 막는다.", "signed 정수 오버플로는 정의되지 않은 동작이며 unsigned는 2의 비트 수만큼 순환한다."),
    tasks("리터럴 접미사와 이스케이프 문자를 해석할 수 있다.", "sizeof 결과가 바이트 단위임을 설명할 수 있다.", "안전한 함수형 매크로를 작성할 수 있다.")
  ]),
  "TODO-59": entry("3회차 · 입·출력 함수와 연산자 (1)", [
    heading("형식화 입출력"), paragraph("printf는 값을 문자열로 출력하고 scanf는 입력 문자열을 객체에 저장한다. 형식 지정자와 실제 인수 형식이 다르면 정의되지 않은 동작이 발생할 수 있다. scanf에는 값을 저장할 주소를 전달하므로 일반 변수 앞에 &가 필요하지만 문자 배열은 배열 이름 자체가 주소로 변환된다."),
    table([["자료형", "printf", "scanf"], ["int", "%d", "%d"], ["unsigned", "%u", "%u"], ["double", "%f", "%lf"], ["char", "%c", " %c"], ["문자열", "%s", "%Ns"]]),
    code("#include <stdio.h>\n\nint main(void) {\n  int age;\n  char name[20];\n  printf(\"이름 나이: \" );\n  if (scanf(\"%19s %d\", name, &age) != 2) return 1;\n  printf(\"%s: %d세\\n\", name, age);\n}"),
    heading("문자·문자열 입출력"), bullets("getchar/putchar는 한 문자를 int로 다뤄 EOF도 표현한다.", "fgets는 버퍼 크기를 받아 공백 포함 한 줄을 안전하게 읽는다.", "puts는 문자열 뒤에 줄바꿈을 붙인다.", "사용자 입력을 printf의 형식 문자열로 직접 사용하지 않는다."),
    heading("산술·관계·논리 연산"), paragraph("정수 나눗셈 7/2는 3이며 나머지는 1이다. ==와 !=는 같은지 비교하고 &&, ||는 단락 평가한다. 0은 거짓, 0이 아닌 값은 참이다. 증감 연산자의 전위형은 변경한 값을, 후위형은 변경 전 값을 식의 결과로 사용한다."),
    tasks("형식 지정자를 자료형에 맞게 선택할 수 있다.", "scanf 반환값을 검사하는 이유를 설명할 수 있다.", "정수 나눗셈과 단락 평가 결과를 계산할 수 있다.")
  ]),
  "TODO-60": entry("4회차 · 입·출력 함수와 연산자 (2)", [
    heading("대입·조건·비트 연산자"), paragraph("복합 대입 a+=b는 a=a+b와 같은 뜻이지만 왼쪽 피연산자를 한 번만 평가한다. 조건 연산자 cond?a:b는 두 값 중 하나를 만드는 식이다. 비트 연산 &, |, ^, ~, <<, >>는 정수의 비트 단위 표현을 다루며 논리 연산 &&, ||와 구분해야 한다."),
    table([["연산", "용도"], ["x & mask", "특정 비트 확인/끄기"], ["x | mask", "특정 비트 켜기"], ["x ^ mask", "특정 비트 뒤집기"], ["x << n", "왼쪽 이동"], ["x >> n", "오른쪽 이동"]]),
    code("#include <stdio.h>\n\nint main(void) {\n  unsigned flags = 0u;\n  const unsigned READ = 1u << 0;\n  const unsigned WRITE = 1u << 1;\n  flags |= READ | WRITE;      /* 켜기 */\n  flags &= ~WRITE;            /* 끄기 */\n  printf(\"read=%s\\n\", (flags & READ) ? \"yes\" : \"no\");\n}"),
    heading("우선순위와 평가"), bullets("우선순위를 외우기보다 의도를 괄호로 명확히 한다.", "=는 대입, ==는 비교다.", "sizeof는 객체나 자료형의 바이트 수를 반환하고 결과형은 size_t다.", "콤마 연산자와 함수 인수 구분 쉼표는 다르다.", "한 식에서 같은 객체를 순서 보장 없이 여러 번 변경하지 않는다: i=i++ 같은 식은 피한다."),
    tasks("비트 마스크로 비트를 켜고 끌 수 있다.", "논리 연산과 비트 연산을 구분할 수 있다.", "연산자 우선순위가 애매한 식을 괄호로 고칠 수 있다.")
  ]),
  "TODO-61": entry("5회차 · 선택 제어문과 반복 제어문", [
    heading("선택문"), paragraph("if는 임의 조건식에 따라 분기하고 switch는 정수·열거형 식을 case 상수와 비교한다. switch의 case는 break가 없으면 다음 case로 계속 실행되는 fall-through가 발생한다. 의도한 경우 주석으로 표시하고, 나머지 값은 default에서 처리한다."),
    code("int grade_to_point(char grade) {\n  switch (grade) {\n    case 'A': return 4;\n    case 'B': return 3;\n    case 'C': return 2;\n    case 'D': return 1;\n    case 'F': return 0;\n    default: return -1;\n  }\n}"),
    heading("반복문"), table([["문", "조건 검사", "적합한 상황"], ["for", "반복 전", "초기화·조건·증감이 한곳"], ["while", "반복 전", "횟수가 미정이고 조건 중심"], ["do-while", "반복 후", "본문을 최소 한 번 실행"]]),
    code("#include <stdio.h>\n\nint main(void) {\n  int sum = 0;\n  for (int i = 1; i <= 100; ++i) {\n    if (i % 2 != 0) continue;\n    sum += i;\n    if (sum > 1000) break;\n  }\n  printf(\"%d\\n\", sum);\n}"),
    heading("오류 점검"), bullets("if 조건 뒤에 실수로 세미콜론을 붙이지 않는다.", "경계 조건의 <와 <=를 확인한다.", "while 안에서 조건 변수가 변하는지 확인한다.", "goto는 일반 흐름 제어보다 중첩 자원 정리 같은 제한된 경우에만 고려한다."),
    tasks("if와 switch의 선택 기준을 설명할 수 있다.", "for·while·do-while을 상호 변환할 수 있다.", "break와 continue의 실행 위치를 추적할 수 있다.")
  ]),
  "TODO-62": entry("6회차 · 함수와 기억 클래스 (1)", [
    heading("함수의 선언·정의·호출"), paragraph("함수는 입력을 매개변수로 받고 결과를 반환하는 독립 작업 단위다. 호출보다 앞서 반환형과 매개변수형을 알리는 원형 선언이 필요하다. 매개변수가 없음을 명확히 할 때 f(void)를 사용한다. 헤더에는 선언을, 소스 파일에는 정의를 두어 분할 컴파일한다."),
    code("#include <stdio.h>\n\nint max_int(int left, int right); /* 원형 선언 */\n\nint main(void) {\n  printf(\"%d\\n\", max_int(7, 12));\n}\n\nint max_int(int left, int right) {\n  return left > right ? left : right;\n}"),
    heading("값 전달과 포인터 매개변수"), paragraph("C의 인수 전달은 항상 값 전달이다. 호출자 변수를 바꾸려면 그 주소를 값으로 전달하고 함수가 포인터를 역참조해야 한다. 배열 매개변수는 첫 원소 포인터로 조정되므로 함수 안의 sizeof로 원래 배열 길이를 구할 수 없다."),
    code("void swap(int *a, int *b) {\n  int temp = *a;\n  *a = *b;\n  *b = temp;\n}\n\nint x = 10, y = 20;\nswap(&x, &y);"),
    heading("인터페이스 원칙"), bullets("함수는 한 가지 책임을 갖게 작게 나눈다.", "수정하지 않는 포인터 매개변수에는 const를 붙인다.", "오류를 반환값으로 알릴지 출력 매개변수로 분리할지 정한다.", "호출자와 함수가 버퍼 크기·소유권 계약을 공유해야 한다."),
    tasks("원형 선언의 필요성을 설명할 수 있다.", "값 전달과 주소를 통한 변경을 구분할 수 있다.", "배열 매개변수와 길이를 함께 받는 함수를 작성할 수 있다.")
  ]),
  "TODO-63": entry("7회차 · 함수와 기억 클래스 (2)", [
    heading("범위·수명·연결"), paragraph("변수의 범위는 이름을 사용할 수 있는 영역, 저장 기간은 객체가 존재하는 시간, 연결은 다른 선언이 같은 객체를 가리키는지를 뜻한다. 이 셋을 혼동하지 않아야 한다. 블록 지역 변수는 기본적으로 자동 저장 기간, 파일 범위 변수는 정적 저장 기간을 가진다."),
    table([["지정자", "핵심 의미"], ["auto", "블록 지역 변수의 기본"], ["register", "빠른 접근 요청; 현대 컴파일러에서는 힌트"], ["static 지역", "호출 사이 값을 유지"], ["static 파일 범위", "현재 번역 단위 내부 연결"], ["extern", "다른 곳에 정의된 외부 연결 객체 선언"]]),
    code("#include <stdio.h>\n\nunsigned next_id(void) {\n  static unsigned id = 0;\n  return ++id;\n}\n\nint factorial(int n) {\n  if (n < 0) return 0;\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}"),
    heading("재귀"), paragraph("재귀 함수는 더 작은 문제로 자신을 호출하며 반드시 종료 조건이 있어야 한다. 호출마다 매개변수와 지역 변수, 복귀 주소가 호출 스택에 쌓인다. 재귀가 명료한 문제도 깊이가 크면 스택 고갈 위험이 있으므로 반복 구현과 비교한다."),
    bullets("전역 변수 정의는 한 소스 파일에 한 번만 두고 헤더에는 extern 선언을 둔다.", "헤더에 일반 전역 변수 정의를 두면 다중 정의 링크 오류가 날 수 있다.", "static 지역 변수는 초기화가 한 번만 수행되며 기본값은 0이다."),
    tasks("범위와 저장 기간을 구분할 수 있다.", "static의 두 용도를 설명할 수 있다.", "재귀 함수의 종료 조건과 호출 스택을 추적할 수 있다.")
  ]),
  "TODO-64": entry("8회차 · 배열과 포인터 (1)", [
    heading("1차원·다차원 배열"), paragraph("배열은 같은 형식의 원소를 연속해서 저장한다. int a[5]의 유효 인덱스는 0~4이며 범위를 넘는 접근은 정의되지 않은 동작이다. 초기화 목록이 짧으면 나머지는 0으로 초기화된다. 2차원 배열은 C에서 행 우선으로 연속 배치된다."),
    code("#include <stdio.h>\n#define ROWS 2\n#define COLS 3\n\nint main(void) {\n  int matrix[ROWS][COLS] = {{1, 2, 3}, {4, 5, 6}};\n  for (size_t r = 0; r < ROWS; ++r) {\n    for (size_t c = 0; c < COLS; ++c) printf(\"%d \", matrix[r][c]);\n    putchar('\\n');\n  }\n}"),
    heading("배열과 함수"), code("#include <stddef.h>\n\nint sum(const int values[], size_t count) {\n  int result = 0;\n  for (size_t i = 0; i < count; ++i) result += values[i];\n  return result;\n}\n\nvoid fill_matrix(size_t rows, size_t cols, int matrix[rows][cols]) {\n  for (size_t r = 0; r < rows; ++r)\n    for (size_t c = 0; c < cols; ++c) matrix[r][c] = (int)(r * cols + c);\n}"),
    bullets("같은 범위에서 sizeof array / sizeof array[0]로 원소 수를 구할 수 있다.", "함수 매개변수에서는 배열이 포인터로 조정되므로 길이를 따로 전달한다.", "다차원 배열 매개변수는 열 크기 또는 VLA 크기 정보가 필요하다."),
    tasks("배열 인덱스 범위를 판별할 수 있다.", "행 우선 저장 순서를 계산할 수 있다.", "길이를 함께 받는 배열 함수를 작성할 수 있다.")
  ]),
  "TODO-65": entry("9회차 · 배열과 포인터 (2)", [
    heading("문자 배열과 문자열"), paragraph("C 문자열은 char 배열에 저장된 문자 열이며 마지막에 널 문자 '\\0'이 있다. 배열 크기에는 널 문자 공간까지 포함해야 한다. 문자열 리터럴을 수정하면 안 되며, char text[] = { 'a', 'b', 'c', '\\0' }는 수정 가능한 배열이고 const char *text는 문자열 리터럴을 가리킬 때 사용한다."),
    table([["함수", "역할", "주의"], ["strlen", "널 이전 문자 수", "버퍼 크기와 다름"], ["strcmp", "사전식 비교", "결과를 0과 비교"], ["strcpy", "문자열 복사", "목적 버퍼 용량 필요"], ["strcat", "뒤에 연결", "남은 공간 필요"], ["fgets", "크기 제한 한 줄 입력", "줄바꿈이 포함될 수 있음"]]),
    code("#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n  char line[64];\n  if (fgets(line, sizeof line, stdin) == NULL) return 1;\n  line[strcspn(line, \"\\n\")] = '\\0';\n  printf(\"길이=%zu, 내용=%s\\n\", strlen(line), line);\n}"),
    heading("안전한 처리"), bullets("scanf의 %s에는 최대 폭을 지정해도 공백에서 입력이 끝난다.", "복사 전 목적지 용량이 원본 길이+1 이상인지 확인한다.", "strcmp(a,b)==0이 같은 문자열이라는 뜻이다.", "문자 분류 함수에 음수 char를 넘길 때는 unsigned char로 변환한다."),
    tasks("문자열 길이와 배열 크기를 구분할 수 있다.", "널 종료가 빠졌을 때의 문제를 설명할 수 있다.", "fgets로 공백 포함 문자열을 안전하게 읽을 수 있다.")
  ]),
  "TODO-66": entry("10회차 · 배열과 포인터 (3)", [
    heading("포인터의 의미"), paragraph("포인터는 객체나 함수의 주소를 저장한다. &는 주소를 얻고 *는 가리키는 객체에 접근한다. 포인터 자료형은 역참조할 값의 해석과 포인터 산술의 이동 단위를 결정한다. 초기화되지 않은 포인터, 수명이 끝난 객체의 주소, NULL 역참조는 사용하지 않는다."),
    code("int values[] = {10, 20, 30};\nint *p = values;\n\nprintf(\"%d %d\\n\", p[1], *(p + 1)); /* 둘 다 20 */\nfor (int *it = values; it < values + 3; ++it) printf(\"%d \", *it);"),
    heading("포인터 배열과 이중 포인터"), table([["선언", "해석"], ["int *p", "int를 가리키는 포인터"], ["int a[10]", "int 10개의 배열"], ["int *a[10]", "int 포인터 10개의 배열"], ["int (*p)[10]", "int 10개 배열을 가리키는 포인터"], ["int **pp", "int 포인터를 가리키는 포인터"]]),
    code("void set_pointer(int **out, int *target) {\n  *out = target;\n}\n\nint value = 42;\nint *pointer = NULL;\nset_pointer(&pointer, &value);\nprintf(\"%d\\n\", *pointer);"),
    heading("const 조합"), bullets("const int *p: p를 통해 값을 변경할 수 없음", "int *const p: p가 다른 주소를 가리킬 수 없음", "const int *const p: 주소와 대상 모두 이 경로로 변경 불가", "서로 다른 배열 사이의 포인터 대소 비교나 뺄셈은 하지 않는다."),
    tasks("복잡한 포인터 선언을 안쪽부터 해석할 수 있다.", "배열 첨자와 포인터 산술의 관계를 설명할 수 있다.", "이중 포인터가 필요한 상황을 설명할 수 있다.")
  ]),
  "TODO-67": entry("11회차 · 구조체와 공용체 (1)", [
    heading("구조체"), paragraph("구조체는 서로 다른 자료형의 멤버를 하나의 레코드로 묶는다. 멤버에는 .으로 접근하고 구조체 포인터에는 ->를 사용한다. 정렬 요구 때문에 멤버 사이에 패딩이 들어갈 수 있으므로 파일·네트워크 형식과 구조체 메모리를 그대로 동일시하면 안 된다."),
    code("#include <stdio.h>\n\ntypedef struct {\n  char name[20];\n  int score;\n} Student;\n\nvoid print_student(const Student *student) {\n  printf(\"%s: %d\\n\", student->name, student->score);\n}\n\nint main(void) {\n  Student student = {.name = \"Haeun\", .score = 95};\n  print_student(&student);\n}"),
    heading("배열·포인터·함수"), bullets("구조체 배열은 같은 레코드 여러 개를 연속 저장한다.", "구조체는 값으로 대입·반환할 수 있지만 큰 구조체는 const 포인터 전달이 효율적이다.", "구조체 포인터 p에서 (*p).member와 p->member는 같다.", "자기 참조 구조체는 같은 구조체 객체가 아니라 포인터 멤버로 선언한다."),
    code("typedef struct Node {\n  int data;\n  struct Node *next;\n} Node;"),
    tasks(".과 ->를 올바르게 선택할 수 있다.", "지정 초기화로 구조체를 초기화할 수 있다.", "자기 참조 구조체가 포인터를 쓰는 이유를 설명할 수 있다.")
  ]),
  "TODO-68": entry("12회차 · 구조체와 공용체 (2)", [
    heading("공용체와 열거형"), paragraph("공용체의 모든 멤버는 같은 저장 공간을 공유하므로 동시에 하나의 표현만 유효하다. 어떤 멤버가 현재 유효한지 태그 열거형과 함께 관리하는 태그드 유니온이 안전하다. enum은 관련 정수 상수에 이름을 부여해 상태를 명확하게 표현한다."),
    code("typedef enum { VALUE_INT, VALUE_DOUBLE } ValueKind;\n\ntypedef struct {\n  ValueKind kind;\n  union { int integer; double real; } data;\n} Value;\n\nvoid print_value(const Value *value) {\n  switch (value->kind) {\n    case VALUE_INT: printf(\"%d\\n\", value->data.integer); break;\n    case VALUE_DOUBLE: printf(\"%f\\n\", value->data.real); break;\n  }\n}"),
    heading("typedef와 비트 필드"), bullets("typedef는 새 자료형을 만드는 것이 아니라 기존 형식의 별칭을 만든다.", "구조체 태그와 typedef 이름은 서로 다른 이름 공간에 속한다.", "비트 필드는 플래그를 압축할 수 있지만 배치가 구현 의존적이어서 이식 가능한 파일 형식에는 부적절하다.", "공용체 크기는 가장 큰 멤버를 담을 수 있고 정렬 패딩이 추가될 수 있다."),
    heading("구조체 설계 점검"), table([["목적", "권장 방식"], ["관련 데이터 묶기", "struct"], ["여러 표현 중 하나", "enum 태그 + union"], ["상수 집합", "enum"], ["복잡한 선언 단순화", "typedef"]]),
    tasks("구조체와 공용체의 메모리 차이를 설명할 수 있다.", "태그드 유니온을 작성할 수 있다.", "typedef와 변수 선언을 구분할 수 있다.")
  ]),
  "TODO-69": entry("13회차 · 파일 처리 함수", [
    heading("스트림과 파일 처리 순서"), paragraph("파일 입출력은 FILE 포인터로 스트림을 열고, 읽거나 쓴 뒤 반드시 닫는 순서다. fopen 실패는 NULL로 확인한다. 텍스트 모드는 문자와 줄 단위 함수, 바이너리 모드는 fread/fwrite를 사용한다. 작업이 끝나기 전 오류 경로에서도 fclose가 실행되도록 구성한다."),
    table([["모드", "의미"], ["r / rb", "기존 파일 읽기"], ["w / wb", "새로 쓰기; 기존 내용 삭제"], ["a / ab", "파일 끝에 추가"], ["r+ / w+ / a+", "읽기와 쓰기"]]),
    code("#include <stdio.h>\n\nint main(void) {\n  FILE *file = fopen(\"scores.txt\", \"r\");\n  if (file == NULL) { perror(\"scores.txt\"); return 1; }\n\n  char name[32];\n  int score;\n  while (fscanf(file, \"%31s %d\", name, &score) == 2)\n    printf(\"%s: %d\\n\", name, score);\n\n  if (ferror(file)) perror(\"read\");\n  fclose(file);\n}"),
    heading("위치 제어와 바이너리 파일"), bullets("fseek(file, offset, origin)으로 SEEK_SET/CUR/END 기준 위치를 이동한다.", "ftell은 현재 위치를 반환하고 rewind는 처음으로 이동한다.", "fread/fwrite 반환값은 처리한 원소 개수이므로 반드시 검사한다.", "구조체를 통째로 저장한 바이너리 파일은 패딩·엔디언·자료형 크기 때문에 이식성이 낮다.", "while(!feof(file)) 패턴 대신 읽기 함수의 성공 여부를 반복 조건으로 사용한다."),
    tasks("파일 모드에 따른 기존 내용 변화를 설명할 수 있다.", "입출력 함수 반환값을 검사할 수 있다.", "순차 처리와 임의 위치 처리를 구분할 수 있다.")
  ]),
  "TODO-70": entry("14회차 · 메모리 동적 할당", [
    heading("동적 메모리"), paragraph("실행 중 필요한 크기가 결정되는 객체는 힙에 동적으로 할당한다. malloc은 초기화하지 않은 바이트를, calloc은 0으로 초기화한 배열 공간을 할당한다. realloc은 크기를 바꾸며 주소가 달라질 수 있다. 모든 할당은 실패해 NULL을 반환할 수 있고, 소유권이 끝나면 정확히 한 번 free해야 한다."),
    table([["함수", "역할"], ["malloc(bytes)", "초기화 없는 할당"], ["calloc(n,size)", "곱한 크기를 0으로 초기화"], ["realloc(ptr,bytes)", "기존 내용 보존하며 크기 변경 시도"], ["free(ptr)", "할당 해제"]]),
    code("#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n  size_t count = 5;\n  int *values = malloc(count * sizeof *values);\n  if (values == NULL) return 1;\n\n  for (size_t i = 0; i < count; ++i) values[i] = (int)(i * i);\n\n  size_t new_count = 10;\n  int *grown = realloc(values, new_count * sizeof *values);\n  if (grown == NULL) { free(values); return 1; }\n  values = grown;\n  free(values);\n  values = NULL;\n}"),
    heading("메모리 오류"), bullets("누수: 할당 주소를 잃어 free할 수 없음", "댕글링 포인터: 해제되거나 수명이 끝난 객체를 가리킴", "이중 해제: 같은 블록을 두 번 free", "버퍼 오버런: 할당 범위를 넘어 접근", "realloc 결과를 원래 포인터에 즉시 대입하면 실패 시 기존 주소를 잃음"),
    heading("메모리 함수"), paragraph("<string.h>의 memcpy는 겹치지 않는 메모리 복사, memmove는 겹칠 수 있는 복사, memset은 바이트 값을 채운다. memcmp는 바이트 열을 비교한다. int 배열을 memset(...,1,...)로 채워도 각 int가 1이 되는 것은 아니다."),
    tasks("동적 배열을 할당·확장·해제할 수 있다.", "안전한 realloc 패턴을 설명할 수 있다.", "누수·댕글링·이중 해제를 구분할 수 있다.")
  ]),
  "TODO-71": entry("15회차 · C++ 언어의 개요", [
    heading("C에서 C++로"), paragraph("C++는 C에서 출발했지만 단순히 클래스가 추가된 C가 아니라 별도의 언어다. 강한 형 검사, 함수 오버로딩, 참조, 클래스, 생성자·소멸자, 템플릿, 예외, 표준 라이브러리를 제공한다. C 코드를 C++ 컴파일러로 빌드한다고 자동으로 좋은 C++ 코드가 되지는 않는다."),
    table([["관점", "C", "C++"], ["입출력", "printf/scanf", "std::cout/std::cin"], ["동적 메모리", "malloc/free", "RAII, 컨테이너, 필요 시 new/delete"], ["문자열", "char 배열", "std::string"], ["동적 배열", "malloc/realloc", "std::vector"], ["추상화", "함수·구조체", "클래스·템플릿"]]),
    code("#include <iostream>\n#include <string>\n#include <vector>\n\nint main() {\n  std::string name = \"KNOU\";\n  std::vector<int> scores{90, 85, 100};\n  int total = 0;\n  for (int score : scores) total += score;\n  std::cout << name << \" 평균: \"\n            << static_cast<double>(total) / scores.size() << '\\n';\n}"),
    heading("클래스와 RAII"), code("class Counter {\n public:\n  explicit Counter(int value = 0) : value_(value) {}\n  void increment() { ++value_; }\n  int value() const { return value_; }\n private:\n  int value_;\n};"),
    bullets("C++에서는 .c가 아니라 .cpp 파일과 C++ 컴파일러를 사용한다.", "malloc/free와 new/delete를 섞지 않는다.", "직접 자원 관리보다 std::vector, std::string, 스마트 포인터를 우선한다.", "const 멤버 함수는 객체 상태를 바꾸지 않는 인터페이스다.", "C 라이브러리와 연결할 때 이름 맹글링 문제는 extern \"C\"로 조정한다."),
    tasks("C와 C++의 핵심 차이를 설명할 수 있다.", "C 배열·문자열을 C++ 표준 컨테이너로 대응할 수 있다.", "RAII가 자원 누수를 줄이는 원리를 설명할 수 있다.")
  ])
};

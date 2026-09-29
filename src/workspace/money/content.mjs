import { accounts } from "./lessons/accounts.mjs";
import { tax } from "./lessons/tax.mjs";
import { macro } from "./lessons/macro.mjs";
import { crypto } from "./lessons/crypto.mjs";
import { property } from "./lessons/property.mjs";
import { stocks } from "./lessons/stocks.mjs";

export const moneyLessons = { accounts, tax, macro, crypto, property, stocks };
export const foundation = [
  ["01", "내 돈의 현재 위치", "순자산 = 자산 − 부채. 예금·투자·보증금과 대출을 같은 기준일에 적고, 당장 현금화할 수 있는 자산을 따로 구분합니다."],
  ["02", "매달 남는 돈", "현금흐름 = 실제 수입 − 실제 지출. 생활비·세금·원리금 상환·비정기 지출을 반영하고, 매출과 개인적으로 쓸 수 있는 돈을 구분합니다."],
  ["03", "목적과 사용 시점", "비상자금·가까운 지출·장기자금을 나눕니다. 비상자금 규모는 생활비·소득 변동·부양 부담에 따라 달라지며 여기서는 일률적인 금액을 정하지 않습니다."],
  ["04", "수익보다 먼저 확인할 것", "무엇을 소유하는가, 언제 현금화할 수 있는가, 최대로 얼마나 잃을 수 있는가, 세금과 비용 후 무엇이 남는가를 설명할 수 있어야 합니다."],
];

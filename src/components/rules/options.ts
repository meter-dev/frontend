import { z } from "zod";

export const RES_ID = {
  // E001: "E001",
  E002: "E002",
  E003: "E003",
  // E004: "E004",
  // E005: "E005",
  W001: "W001",
  // W002: "W002",
  // W003: "W003",
  Q001: "Q001",
} as const;

export const RESOURCES = [
  // { value: "E001", label: "備轉容量 (kWh)" },
  { value: RES_ID.E002, label: "供電 - 備轉容量率 (%)" },
  { value: RES_ID.E003, label: "供電 - 備轉燈號" },
  // { value: "E004", label: "使用量 (kWh)" },
  // { value: "E005", label: "使用率 (%)" },
  { value: RES_ID.W001, label: "供水 - 水庫水位 (%)" },
  // { value: "W002", label: "水庫蓄水量 (萬立方公尺)" },
  // { value: "W003", label: "水庫昨日變化率 (%) " },
  { value: RES_ID.Q001, label: "地震 - 芮氏規模" },
];
export const VALUE_VALIDATOR = {
  [RES_ID.E002]: z.number().min(0).max(100),
  [RES_ID.E003]: z.number().int().min(0).max(4),
  [RES_ID.W001]: z.number().min(0).max(100),
  [RES_ID.Q001]: z.number().min(0),
};

export const POSITIONS = {
  E: [
    { value: "national", label: "全台灣" },
    { value: "north", label: "北部" },
    { value: "central", label: "中部" },
    { value: "south", label: "南部" },
  ],
  W: [
    {
      value: "石門水庫",
      label: "石門水庫",
    },
    {
      value: "翡翠水庫",
      label: "翡翠水庫",
    },
    {
      value: "寶山第二水庫",
      label: "寶山第二水庫",
    },
    {
      value: "永和山水庫",
      label: "永和山水庫",
    },
    {
      value: "明德水庫",
      label: "明德水庫",
    },
    {
      value: "鯉魚潭水庫",
      label: "鯉魚潭水庫",
    },
    {
      value: "德基水庫",
      label: "德基水庫",
    },
    {
      value: "石岡壩",
      label: "石岡壩",
    },
    {
      value: "霧社水庫",
      label: "霧社水庫",
    },
    {
      value: "日月潭水庫",
      label: "日月潭水庫",
    },
    {
      value: "集集攔河堰",
      label: "集集攔河堰",
    },
    {
      value: "湖山水庫",
      label: "湖山水庫",
    },
    {
      value: "仁義潭水庫",
      label: "仁義潭水庫",
    },
    {
      value: "白河水庫",
      label: "白河水庫",
    },
    {
      value: "烏山頭水庫",
      label: "烏山頭水庫",
    },
    {
      value: "曾文水庫",
      label: "曾文水庫",
    },
    {
      value: "南化水庫",
      label: "南化水庫",
    },
    {
      value: "阿公店水庫",
      label: "阿公店水庫",
    },
    {
      value: "高屏溪攔河堰",
      label: "高屏溪攔河堰",
    },
    {
      value: "牡丹水庫",
      label: "牡丹水庫",
    },
  ],
  Q: [
    { value: "基隆市", label: "基隆市", code: "01" },
    { value: "台北市", label: "台北市", code: "02" },
    { value: "新北市", label: "新北市", code: "03" },
    { value: "桃園縣", label: "桃園縣", code: "04" },
    { value: "新竹市", label: "新竹市", code: "05" },
    { value: "新竹縣", label: "新竹縣", code: "06" },
    { value: "苗栗縣", label: "苗栗縣", code: "07" },
    { value: "台中市", label: "台中市", code: "08" },
    { value: "彰化縣", label: "彰化縣", code: "09" },
    { value: "南投縣", label: "南投縣", code: "10" },
    { value: "雲林縣", label: "雲林縣", code: "11" },
    { value: "嘉義市", label: "嘉義市", code: "12" },
    { value: "嘉義縣", label: "嘉義縣", code: "13" },
    { value: "台南市", label: "台南市", code: "14" },
    { value: "高雄市", label: "高雄市", code: "15" },
    { value: "屏東縣", label: "屏東縣", code: "16" },
    { value: "台東縣", label: "台東縣", code: "17" },
    { value: "花蓮縣", label: "花蓮縣", code: "18" },
    { value: "宜蘭縣", label: "宜蘭縣", code: "19" },
    { value: "澎湖縣", label: "澎湖縣", code: "20" },
    { value: "金門縣", label: "金門縣", code: "21" },
    { value: "連江縣", label: "連江縣", code: "22" },
  ],
};

export const OPERATORS = [
  { value: ">", label: ">" },
  { value: ">=", label: ">=" },
  { value: "<", label: "<" },
  { value: "<=", label: "<=" },
];

export const VALUES = {
  //   E001: { type: "numeric", unit: "kWh" },
  [RES_ID.E002]: { type: "percent", unit: "%" },
  [RES_ID.E003]: {
    type: "category",
    unit: "",
    options: [
      { value: 0, label: "綠燈 (0)" },
      { value: 1, label: "黃燈 (1)" },
      { value: 2, label: "橘燈 (2)" },
      { value: 3, label: "紅燈 (3)" },
      { value: 4, label: "黑燈 (4)" },
    ],
  },
  //   E004: { type: "numeric", unit: "kWh" },
  //   E005: { type: "percent", unit: "%" },
  [RES_ID.W001]: { type: "percent", unit: "%" },
  //   W002: { type: "numeric", unit: "萬立方公尺" },
  //   W003: { type: "percent", unit: "%" },
  [RES_ID.Q001]: { type: "numeric", unit: "芮氏規模" },
};

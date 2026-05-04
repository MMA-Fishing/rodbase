const dataLabelTranslations = {
  "zh-Hant": {
    "Travel": "旅行 / 便攜",
    "Mobile rod": "便攜竿",
    "Lure fishing": "路亞",
    "Shore": "岸釣",
    "Pier": "碼頭",
    "Light Game": "輕量釣法",
    "Ajing": "豆鯵 / Ajing",
    "Trout": "鱒魚",
    "Bass": "Bass",
    "Seabass": "海鱸",
    "Eging": "木蝦",
    "Rockfish": "根魚",
    "Surf": "沙灘 / Surf",
    "Shore jigging": "岸拋鐵板",
    "Light shore jigging": "輕型岸拋鐵板",
    "Super light shore jigging": "超輕型岸拋鐵板",
    "Heavy shore jigging": "重型岸拋鐵板",
    "Saltwater": "海水",
    "Distance casting": "遠投",
    "Small lure": "小型路亞",
    "Baitcasting": "橫鉸 / Baitcasting",
    "Telescopic": "伸縮",
    "Multi-piece": "多節",
    "4-piece": "4 節",
    "3-piece": "3 節",
    "2-piece": "2 節",
    "1-piece": "1 節",

    "Current": "現行",
    "Current / Recent": "現行 / 近期",
    "In progress": "整理中",

    "Japan": "日本",
    "Asia": "亞洲",
    "Malaysia": "馬來西亞",
    "Europe": "歐洲",
    "Global": "全球",
    "USA": "美國",
    "UK": "英國",
    "Australia": "澳洲",
    "Taiwan": "台灣",
    "Scandinavia": "北歐",
    "Southeast Asia": "東南亞",

    "Spinning": "直鉸",
    "Baitcasting": "橫鉸",

    "Mobile spinning rod": "便攜直鉸竿",
    "Telescopic spinning rod": "伸縮直鉸竿",
    "Telescopic baitcasting rod": "伸縮橫鉸竿",
    "Shore jigging spinning rod": "岸拋鐵板直鉸竿",
    "Telescopic shore jigging rod": "伸縮岸拋鐵板竿",

    "Ultra Light": "UL / 超輕",
    "Light": "L / 輕",
    "Medium Light": "ML / 中輕",
    "Medium": "M / 中",
    "Medium Heavy": "MH / 中重",
    "Heavy": "H / 重",
    "Super Light": "超輕",
    "Light Shore Jigging": "輕型岸拋鐵板",

    "Regular": "Regular",
    "Regular Fast": "Regular Fast",
    "Unknown": "未列明"
  }
};

export function translateDataLabel(locale, value) {
  if (value === null || value === undefined || value === "") {
    return locale === "zh-Hant" ? "未列明" : "Not listed";
  }

  const text = String(value);
  return dataLabelTranslations[locale]?.[text] ?? text;
}

export function translateLabelList(locale, values = [], separator = " / ") {
  if (!Array.isArray(values) || values.length === 0) {
    return locale === "zh-Hant" ? "未列明" : "Not listed";
  }

  return values.map((value) => translateDataLabel(locale, value)).join(separator);
}

export function translateSlashText(locale, value) {
  if (!value) {
    return locale === "zh-Hant" ? "未列明" : "Not listed";
  }

  const text = String(value);

  if (dataLabelTranslations[locale]?.[text]) {
    return dataLabelTranslations[locale][text];
  }

  return text
    .split(" / ")
    .map((part) => translateDataLabel(locale, part))
    .join(" / ");
}

export type Language = "ja" | "en" | "zh";

export type MenuCourse = {
  title: string;
  price: string;
  detail: readonly string[];
  note?: string;
};

// The artwork is kept in the same order as the supplied PDF menus.
export const menuArtwork = [5980, 8800, 13200, 19800].map(price => `/images/menus/menu-${price}.webp`);

export const menuContent: Record<Language, readonly MenuCourse[]> = {
  ja: [
    {
      title: "個園", price: "¥5,980",
      detail: ["前菜3種盛り合わせ", "あさりと春の水菜の澄んだスープ", "鮑の姿蒸し", "辣子鶏", "ご飯", "香港點心一品", "本日のデザート"],
      note: "ランチ限定にて、＋350円で銘茶（一煎）またはランチビール（約200cc）をご用意しております。",
    },
    {
      title: "網師園", price: "¥8,800",
      detail: ["前菜三品盛り合わせ", "あさりと春の水菜の澄んだスープ", "名物 口水鶏", "口水鶏の余韻を、特製ダレの麺とうずら卵で", "活〆桜鯛の清蒸", "仔鳩香煎", "口休め", "自慢の一本長亭酢豚", "鮑の姿蒸し", "本日のデザート", "お茶"],
    },
    {
      title: "留園", price: "¥13,200",
      detail: ["季節前菜3種盛り合わせ", "森の至宝・五種茸の滋養スープ", "名物 口水鶏", "口水鶏の余韻を、特製ダレの麺とうずら卵で", "活〆桜鯛の清蒸", "仔鳩（ピジョン）香煎", "口休め", "黒毛和牛の炙り焼き", "春野菜の炒め", "フカヒレ餡かけ御飯", "本日のデザート", "お茶"],
    },
    {
      title: "長亭", price: "¥19,800",
      detail: ["季節前菜5種盛り合わせ", "特別椀 — 椰子殻盛り 古鶏長煮白湯 薬膳四種添え（高麗人参、枸杞、蓮の実、大棗）", "活〆桜鯛の清蒸", "仔鳩香煎", "口休め", "鮑の姿蒸し", "黒毛和牛の炙り焼き", "フカヒレの姿煮", "黒トリュフとキャビアのタリオリーニ", "特注デザート", "お茶"],
    },
  ],
  en: [
    {
      title: "Ge Garden", price: "¥5,980",
      detail: ["Three appetizers", "Clear clam and spring mizuna soup", "Whole steamed abalone", "Sichuan chili chicken", "Rice", "One Hong Kong dim sum", "Dessert of the day"],
      note: "At lunch only, add ¥350 for fine tea (one infusion) or a lunch beer (approximately 200 ml).",
    },
    {
      title: "Master of the Nets Garden", price: "¥8,800",
      detail: ["Three appetizers", "Clear clam and spring mizuna soup", "Signature Sichuan mouthwatering chicken", "Noodles in our special chicken sauce, with a quail egg", "Steamed sakura sea bream", "Pan-seared squab", "Palate cleanser", "Signature CHOTEI sweet-and-sour pork", "Whole steamed abalone", "Dessert of the day", "Tea"],
    },
    {
      title: "Lingering Garden", price: "¥13,200",
      detail: ["Three seasonal appetizers", "Nourishing five-mushroom soup", "Signature Sichuan mouthwatering chicken", "Noodles in our special chicken sauce, with a quail egg", "Steamed sakura sea bream", "Pan-seared squab", "Palate cleanser", "Seared Japanese Black wagyu", "Stir-fried spring vegetables", "Rice with shark fin sauce", "Dessert of the day", "Tea"],
    },
    {
      title: "CHOTEI", price: "¥19,800",
      detail: ["Five seasonal appetizers", "Special soup — slow-simmered mature chicken broth in a coconut shell, with Korean ginseng, goji berries, lotus seeds and jujube", "Steamed sakura sea bream", "Pan-seared squab", "Palate cleanser", "Whole steamed abalone", "Seared Japanese Black wagyu", "Whole braised shark fin", "Tagliolini with black truffle and caviar", "Special dessert", "Tea"],
    },
  ],
  zh: [
    {
      title: "个园", price: "¥5,980",
      detail: ["前菜三品", "蛤蜊春水菜清汤", "原只清蒸鲍鱼", "辣子鸡", "米饭", "港式点心一品", "当日甜品"],
      note: "午餐限定：加350日元可享茗茶（一泡）或午餐啤酒（约200毫升）。",
    },
    {
      title: "网师园", price: "¥8,800",
      detail: ["前菜三品", "蛤蜊春水菜清汤", "招牌口水鸡", "口水鸡特制酱汁拌面配鹌鹑蛋", "清蒸活缔樱鲷", "香煎乳鸽", "清口小品", "招牌长亭一根酢豚", "原只清蒸鲍鱼", "当日甜品", "茶"],
    },
    {
      title: "留园", price: "¥13,200",
      detail: ["时令前菜三品", "五珍菌菇滋养汤", "招牌口水鸡", "口水鸡特制酱汁拌面配鹌鹑蛋", "清蒸活缔樱鲷", "香煎乳鸽", "清口小品", "炙烤黑毛和牛", "清炒春蔬", "鱼翅烩饭", "当日甜品", "茶"],
    },
    {
      title: "长亭", price: "¥19,800",
      detail: ["时令前菜五品", "特制汤品——椰壳盛老鸡慢炖白汤，配高丽参、枸杞、莲子、红枣", "清蒸活缔樱鲷", "香煎乳鸽", "清口小品", "原只清蒸鲍鱼", "炙烤黑毛和牛", "原翅红烧鱼翅", "黑松露鱼子酱细意面", "特制甜品", "茶"],
    },
  ],
};

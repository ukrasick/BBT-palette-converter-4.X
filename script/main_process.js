// 定数の定義
// 能力値の名称（英語）
const KEY_ABILITY = ["body", "skill", "emotion", "divine", "society", "combat", "shoot", "dodge", "action"];
// 能力値名の日英対応
const ABILITIES = {
    etj: { "body": "肉体", "skill": "技術", "emotion": "感情", "divine": "加護", "society": "社会", "combat": "白兵", "shoot": "射撃", "dodge": "回避", "action": "行動", "binds": "絆数" },
    jte: { "肉体": "body", "技術": "skill", "感情": "emotion", "加護": "divine", "社会": "society", "白兵": "combat", "射撃": "shoot", "回避": "dodge", "行動": "action", "絆数": "binds" }
};
// 文字実体参照への変換対象
const DICTIONARY_TO_ENTITY_REFERENCES = {'<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;', '&': '&amp;'};
// ルビ振り対象アーツ
const ARTS_WITH_RUBY = {
    "^血脈": "ストレイン",
    "秦家": "インペリアル",
    "楚家": "ドラケン",
    "斉家": "ランベック",
    "燕家": "ディアブロ",
    "趙家": "パラティヌス",
    "魏家": "ドゥカート",
    "韓家": "ノスフォロス",
    "洗礼": "バプティスマ",
    "黄昏の幻想": "トワイライトファンタズム",
    "死を想え": "メメントモリ",
    "虚銃": "うつろなるじゅう",
    "餓光": "かつえしひかり",
    "空門": "くうなるもん",
    "白闇": "しろきやみ",
    "殲舞": "せんめつのまい",
    "魂裂": "たましいさくもの",
    "罪弾": "たまのなはつみ",
    "貫閃": "つらぬくいっせん",
    "遠雷": "とおきいかずち",
    "双銃": "ふたごのじゅう",
    "砲吼": "ほえたけるつつ",
    "兇弾": "まがきじゅうだん",
    "貪闇": "むさぼるやみ",
    "銃僕": "じゅうのしもべ",
    "白滅": "しろきほろび",
    "呑界": "せかいをのむ",
    "喰我": "われをくらう",
    "銀河大百科事典": "エンサイクロペディアギャラクティカ",
    "感情収穫者": "エモーションリーパー",
    "究極破壊砲": "オメガスマッシャー",
    "宇宙の旅": "スペースオデッセイ",
    "異能綺士": "サイコリッター",
    "聖骸機": "ネクロメイル",
    "王の中の王": "キング・オブ・モンスターズ",
    "笑顔の魔法": "カインドマジック",
    "太古の王者": "キングオブデストロイヤー",
    "氷獄現出": "Let It Go",
    "天使核": "エンジェルシード",
    "水晶邪封陣": "クリト＝ファー",
    "星の光": "ミィヤ・ザワ・ケーンズィ",
    "精霊獣召喚": "フェア・ビート・コー",
    "呪圏拡大": "エクステンド",
    "剣の舞": "ソードダンス",
    "魔法盾": "マジックシールド",
    "身体強化": "フィジカルエンチャント",
    "次元再編": "ストレンジディメンジョン",
    "夢魔術師": "オネイロス",
    "加速装置": "アクセラレーター",
    "限界突破": "リミットブレイク",
    "反救世主殲滅機構": "アンチクライストジェノサイダー",
    "漆黒機械": "ブラックギフト",
    "秒針剣": "チクタクソード",
    "終末時計": "ドゥームズデイ・クロック",
    "価値ある相棒": "クオリティメイト",
    "ささやかな魔法": "タイニーマジック"
};
// ルビ振り対象アイテム
const ITEMS_WITH_RUBY = {
    "万能水銀": "オムニ・マーキュリー",
    "吐息": "ブレス",
    "魔殺弾": "マジシャンベイン",
    "下級魔術": "ヘッジマジック",
    "簡易幻影": "イリュージョン",
    "魔術師の手": "マジシャンズハンド",
    "占術": "ディヴィネーション",
    "幽体離脱": "アストラルプロジェクション",
    "精神操作": "マインドトリック",
    "正義執行官": "プラエトル",
    "聖骸機": "ネクロメイル",
    "叫魂石": "クライストーン"
};
// ルビ振りテンプレート 本文を%parent%、ルビ部分を%ruby%として記入
const RUBY_TEMPLATE = {
    "ユドナリウムリリィ": "｜%parent%《%ruby%》",
    "Udonarium with Fly": "｜%parent%《%ruby%》",
    "ユドナイト": "｜%parent%《%ruby%》",
    "ユドナリウム（ルビ対応）": "｜%parent%《%ruby%》",
    "ゆとチャadv.": "｜%parent%《%ruby%》"
};
// ルビ振りの正規表現
const RUBY_REGEXP = {
  arts: new RegExp(`${Object.keys(ARTS_WITH_RUBY).join("|")}`, "g"),
  items: new RegExp(`${Object.keys(ITEMS_WITH_RUBY).join("|")}`, "g")
};
// アーツ、アイテムの宣言文テンプレート
const DECLARATION_TEMPLATES = {
    "Udonarium with Fly": { arts: "《%name%》", items: "『%name%』" },
    "ユドナイト": { arts: "《%name%》", items: "『%name%』" },
    default: { arts: "《%name%》", items: "「%name%」" }
};
// 判定用の【能力値】引用テンプレート
const ABILITY_TEMPLATES = {
  default: { before: "\{", after: "\}" }
};
// アーツ、アイテムの宣言文テンプレートを取得する
function getDeclarationTemplate(tool) {
    return tool in DECLARATION_TEMPLATES ? DECLARATION_TEMPLATES[tool] : DECLARATION_TEMPLATES.default;
}
// 能力値テンプレートの置換
function convertAbilityTemplateToString(name) {
  const tool = AppCore.settings.general.sessionTool;
  const templates = tool in ABILITY_TEMPLATES ? ABILITY_TEMPLATES[tool] : ABILITY_TEMPLATES.default;
  return (templates.before + name + templates.after).replace("\\", "");
}

// キャラクターシート倉庫から、JSONPでデータを取得し、チャットパレットデータに加工
function convert(data, cache=false) {
  if(!data) {
    window.alert("エラー：データが取得できませんでした。キャラクターシートのURLを確認してください。");
    return;
  }
  // データキャッシュがない場合、キャッシュを作成
  if(!cache) {
    AppCore.character.mainData = JSON.parse(JSON.stringify(data));
    AppCore.character.mainDataName = data.base.name;
    data = AppCore.character.mainData;  // キャッシュしたものにデータをすり替える
  }
  
  // ファンブル値変化アーツの自動検索がONの場合、ここで行う
  if(AppCore.settings.general.autoCheckFumbleValue) {
    checkGeneralCriticalAndFumbleData(data);
  }

  // チャットパレットデータの作成
  let paletteText = outputTextByOrder(data);
  // 予約語に対応しないシステムの場合、予約語の部分を実数値に置換
  if(!AppCore.systemConfig().reservedWords) {
    // 置換処理の関数を起動する
    paletteText = replaceReservedWordsToValue(paletteText, data);
  }
  // 末尾の改行を削除
  paletteText = paletteText.replace(/\n$/, "");

  // 結果の出力
  AppCore.character.palette = paletteText;
  AppCore.character.lastTool = AppCore.settings.general.sessionTool;
  // 結果先へ画面をスクロールする
  scrollByToById("pc4x-editor-7");
  // オプションの自動保存実行
  if(AppCore.settings.general.autoSave) {
    AppCore.save_options(false);
  }

  // キャラクター駒作成処理
  if(AppCore.systemConfig().pawnGenerator) {
    const tool = AppCore.settings.general.sessionTool;
    // キャラクター駒作成の処理を開始する
    // パレット出力ごとに初期化しない設定の場合、必要のないとき以外はチェックを行わない
    // 「データが存在しない時」または「パレット出力の際に駒データを初期化する設定の時」が該当
    if(Object.keys(AppCore.character.pawnData).length === 0 || AppCore.settings.outputPawn.initializeParams) {
      AppCore.initializePawnData();
      // ユドナリウム系ツールの出力
      if(isUdonariumLineage(tool)) {
        AppCore.initializeUdonariumPawn();
        setupUdonariumPawn(data);
      }
      // ココフォリア系ツールの出力
      if(tool === "ココフォリア") {
        AppCore.initializeCcfoliaPawn();
        setupCcfoliaPawn(data);
      }
    }
  }
}
// 画面のスクロール用関数 id: DOMにおけるコンテンツのID
function scrollByToById(id) {
  const content = document.getElementById(id);
  const box = content.getBoundingClientRect();
  window.scrollBy({top: box.top, behavior: "smooth"});
}
// ユドナリウム系ツールか否かの確認
function isUdonariumLineage(tool) {
  const Udonarium = [
    "ユドナリウム", "ユドナリウムリリィ", "Udonarium with Fly", "ユドナイト", "ユドナリウム（ルビのみ）"
  ]
  return Udonarium.includes(tool) ? true : false;
}

// 「出力する項目と順番」の設定に準じて、チャットパレットテキストを作成する
function outputTextByOrder(data) {
  let result = [];
  for(let obj of AppCore.settings.outputOrders.list) {
    if(!obj.usable) { continue; }
    let output;
    switch(obj.name) {
      case "登場":
        output = outputSceneEntry(data);
        break;
      case "一般的な判定":
        output = outputAllJudgeText(data);
        break;
      case "一般的な行動":
        output = outputGeneralActions(data);
        break;
      case "アーツ":
        output = outputObjects(data, "アーツ一覧");
        break;
      case "アイテム":
        output = outputObjects(data, "アイテム一覧");
        break;
      case "リアクション":
        output = outputGeneralReactions(data);
        break;
      case "愛・罪の効果":
        output = outputAgapeyAndGuilty(data);
        break;
      case "ダメージロール":
        output = outputDamageRolls(data);
        break;
      case "能力値一覧":
        output = outputReservedValues(data);
        break;
      case "リソース操作":
        output = outputResourceOperator(data);
        break;
    }
    if(output) { result.push(output); }
  }
  return result.join("\n");
}
// ファンブル値関連アーツの条件を自動検索
function checkGeneralCriticalAndFumbleData(data) {
  // アーツ名一覧を作成し、すべて繋げた文字列にする
  let artsList = getAllArtsNameList(data).join(",");
  // ファンブル値関連アーツのリストに入っているアーツの名前を検索
  for(let i of AppCore.notes.fumbleArtsList) {
    if(artsList.match(new RegExp(i))) {
      AppCore.modifiers.artsFumble.push(i);
    }
  }
  // 《記憶封印》されていない、ハーミットのブラッドしか持たないモータルかどうかも確認
  if(isMortal(data)) {
    AppCore.modifiers.artsFumble.push("モータル");
  }
}

// 《記憶封印》を持たないモータルか否かをチェック
function isMortal(data) {
  // キャッシュデータに登録済みの場合、それを返却
  if("isMortal" in data) { return data.isMortal; }
  // プライマリブラッド、セカンダリブラッドを取得
  let array = [data.base.bloods.primary, data.base.bloods.secondary];
  let result = 0;
  // 追加ルーツを取得。ただし初期値の場合は追加しない
  for(let i of data.addRoots) {
    if(i.bloodmanual || i.racemanual || i.root || i.rootmanual) {
      array.push(i);
    }
  }
  // ルーツ一覧から、モータルのルーツが存在するかどうかをチェックする
  for(let b of array) {
    // モータルのルーツが名指しされている場合、それを記録
    // サプリメント化によってキャラクターシート倉庫の更新があった場合は要チェック
    if(b.blood === "手動入力" && b.rootmanual === "モータル") { result += 1; }
    // ブラッド：ハーミットの場合、先にcontinueして処理をスキップ
    // 「ルーツ：巫女」も、サプリ化でキャラクターシート倉庫が更新されたら処理要注意
    if(b.blood === "手動入力" && b.rootmanual === "巫女") { continue; }
    if(b.blood === "ハーミット") { continue; }
    // それ以外のブラッドをひとつでも持つ＝《記憶封印》ではないモータルではないので即座にfalse
    data.isMortal = false;
    return false;
  }
  // 「ルーツ：モータル」の記載があった欄の数を確認
  data.isMortal = result > 0;
  return data.isMortal;
}
// 「ルーツ：呪われし者」か否かをチェック
function isCursedOne(data) {
  if("isCursedOne" in data) { return data.isCursedOne; }
  // ルーツ一覧から絞り込み
  for(let b of [data.base.bloods.primary, data.base.bloods.secondary].concat(data.addRoots)) {
    // サプリ化によってキャラクターシート倉庫が更新された場合、処理を追加する必要あり
    if(b.blood === "手動入力" && b.rootmanual === "呪われし者") {
      data.isCursedOne = true;
      return true;
    }
  }
  data.isCursedOne = false;
  return false;
}
// 「大罪」取得者か否かをチェック
function hasGreatGuilty(data) {
  if("hasGG" in data) { return data.hasGG; }
  // 絆・エゴデータの種別に「大罪」を含む場合、大罪持ちとして扱う
  for(let b of data.binds) {
    if(!b || !b.type) { continue; }
    if(b.type.match(/大罪/)) {
      data.hasGG = true;
      return true;
    }
  }
  // アーツデータの種別に「大罪」を含む場合、大罪持ちとして扱う
  for(let a of data.arts) {
    if(!a || !a.type) { continue; }
    if(a.type.match(/大罪/)) {
      data.hasGG = true;
      return true;
    }
  }
  // ここまでにデータ検索で挙がらなかった場合は、大罪持ちではない
  data.hasGG = false;
  return false;
}
// ブラッドから種別を取得。アーツ効果による種別の追加・削除は考慮しない
function getCharacterKinds(data) {
  if("allKinds" in data) { return data.allKinds; }
  // ブラッド取得準備
  let result = [];
  let array = [data.base.bloods.primary, data.base.bloods.secondary];
  for(let i of data.addRoots) {
    if(i.bloodmanual || i.racemanual || i.root || i.rootmanual) { array.push(i); }
  }
  // 関数定義
  const kindChecker = (blood) => {
    const DICT = {
      "イレギュラー": "人間", "ヴァンパイア": "吸血", "エトランゼ": "来訪", "スピリット": "精霊",
      "セレスチャル": "神聖", "デーモン": "魔界", "ネイバー": "亜人", "ハーミット": "人間",
      "フルメタル": "機械", "レジェンド": "概念", "ヴォイド": "概念", "ストレンジャー": "来訪",
      "コズミックホラー": "邪神", "ダークカルテル": "人間", "ジャイガント": "怪獣"
    };
    return blood in DICT ? DICT[blood] : void 0;
  };
  // ブラッドデータチェック
  for(let b of array) {
    let k;
    if(b.blood === "手動入力") {
      k = b.racemanual ? b.racemanual : kindChecker(b.bloodmanual);
    } else {
      k = kindChecker(b.blood);
    }
    if(k) { result.push(k); }
  }
  data.allKinds = result;
  return data.allKinds;
}
// アーツ名の一覧を作成する
function getAllArtsNameList(data) {
  if("allArtsList" in data) { return data.allArtsList; }
  let result = [];
  for(let i of data.arts) {
    if(!i || !i.name) { continue; }
    // 改行文字の削除、半角の各種文字を全角にチェンジ
    result.push(i.name.replace(/[\r\n]+/g, "").replace("!", "！").replace("?", "？").replace(":", "："));
  }
  data.allArtsList = result;
  return data.allArtsList;
}
// オンラインセッションツールに応じたセクションヘッダー・フッターの挿入
function addSubHeaderAndFooterByTool(subHead, array = []) {
  let pullDown = "";
  switch(AppCore.settings.general.sessionTool) {
    case "ユドナリウムリリィ":
      array.unshift(`//---${subHead}`);
      array.push("");
      break;
    case "Tekey":
      if(AppCore.settings.specialized["Tekey"].applyPullDown.includes(subHead)) {
        pullDown = "###";
      }
      array.unshift(`${pullDown}■${subHead}`);
      array.push(`${pullDown}`);
      break;
    case "ゆとチャadv.":
      if(AppCore.settings.specialized["ゆとチャadv."].applyPullDown.includes(subHead)) {
        pullDown = "###";
      }
      array.unshift(`${pullDown}■${subHead}`);
      array.push(`${pullDown}`);
      break;
    default:
      array.unshift(`■${subHead}` + "-".repeat(10));
      array.push("");
      break;
  }
  return array;
}
// 能力値名の日英相互変換
function abilityName(key, lang="j") {
  switch(lang) {
    case "j":
      if(key.length == 2) { return key; }
      return ABILITIES.etj[key];
    case "e":
      if(key.length > 2) { return key; }
      return ABILITIES.jte[key];
  }
}
// 日本語の予約語を取得する
function abilityNameForReservedWord(key, mode = "h") {
  // 「絆」がkeyに指定されている場合はそのまま返還
  if(key === "絆数" || key === "binds") { return "絆数"; }
  // 《魔獣化》中の能力値参照を表すmode = bが指定されている場合、「魔●」に返還
  return ((mode === "b" ? "魔" : "") + abilityName(key, "j")).substring(0, 2);
}
// 【基本能力値】か【戦闘能力値】かを判定
function abilityType(key) {
  // 「絆数」がkeyの場合はundefinedを返す
  if(key === "絆数") { return void 0; }
  // 日本語名のkeyを与えられた場合、先に英語名に変換する
  if(key.length == 2) { key = abilityName(key, "e"); }
  // keyの内容からどちらの【能力値】かを判別
  if(["body", "skill", "emotion", "divine", "society"].includes(key)) {
    return "baseAbility";
  } else if (["combat", "shoot", "dodge", "action"].includes(key)) {
    return "battleAbility";
  }
  // すべてにあてはまらない場合、undefined
  return void 0;
}
// 文字実態参照への変換
function changeStringToEntityReferences(str) {
  if(!str) { return ""; }
  str = str.replace(/[<>"'&]/g, function(s) { return DICTIONARY_TO_ENTITY_REFERENCES[s]; })
  return str;
}
// 文字列の加工 【能力値】表記が絡む表記を加工しやすい形に変換する
function processStringScoreToPreText(str) {
  if(!str) { return ""; }
  // 丸括弧以外で使われそうな括弧を剥奪、空白文字の削除を行い、能力値の表示を {能力値} に変更
  return str.replace(/[\[\]【】\{\}｛｝値/r/n/s]/g, "")
            .replace(/(肉体|技術|感情|加護|社会|白兵|射撃|回避|行動|魔肉|魔技|魔感|魔加|魔社|魔白|魔射|魔回|魔行|絆数)/g, convertAbilityTemplateToString("$&"));
}
// 《魔獣化》中のテキストの切り分け
function separateBeastFormula(str, mode="h", obj=null) {
  // 【能力値】表記が絡むものを、加工しやすいようにコンバートする
  str = processStringScoreToPreText(str)
        .replace(/[Ａ-Ｚａ-ｚ０-９＋－（）]/g, function(s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); } )
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/\(:(.*?)\)/g, '&qformer;$1&qlatter;');
  // 計算式に「LV」を含むアーツ関連のデータは、「LV」部分を実際のアーツデータに準じた数値に置換する
  if(obj && "level" in obj) {
    if(obj.level && obj.level.replace(/\r\n\s/g, "").match(/^\d+$/)) {
      str = str.replace(/LV/ig, `${parseInt(obj.level.replace(/\r\n\s/g, ""), 10)}`);
    }
  }
  // モードによって返す文字列を変更
  let r = "";
  switch(mode) {
    case "h":
      // 人間状態。( ) の中身を削除する
      r = str.replace(/\([^\(\)]*\)/gi, "");
      break;
    case "b":
      r = str;
      let strRegex = r.match(/([^\(\)]*)(?:\()([^\(\)]*)(?:\))/i);
      // テキスト設計が終わるまで、繰り返し処理
      while(strRegex) {
        // 確認用：[0]=>matchした文字列全体  [1]=>( )の外側  [2]=>( )の内側
        let regexConvert = void 0;
        // regex[2]の先頭が正負記号の場合、補正値を単純に加算とみなして両方を計上する
        if(strRegex[2].match(/^[\+\-]/)) {
          regexConvert = [strRegex[1], strRegex[2]].join("");
        }
        // regex[1], [2]の両方が途中で正負記号を挟む場合、式全体を置換
        if(strRegex[1].match(/^[^\+\-]*[\+\-].*/) && strRegex[2].match(/^[^\+\-]*[\+\-].*/)) {
          if(!regexConvert) { regexConvert = strRegex[2]; }
        }
        // regex[1]が途中で正負記号を含む場合、最後の符号の直後のみがマッチするのでそこだけ書き換え
        if(strRegex[1].match(/[^\+\-]*[\+\-].*/)) {
          if(!regexConvert) {
            let arrayRegex = strRegex[1].split(/(\+|\-)/g);
            if(arrayRegex.length > 1) { arrayRegex.pop(); }
            arrayRegex.push(strRegex[2]);
            regexConvert = arrayRegex.join("");
          }
        }
        // ここまでに変換パターンがあてはまらなかった場合、素直に全体を置き換える
        if(!regexConvert) { regexConvert = strRegex[2]; }
        // テキストの書き換え
        r = r.replace(strRegex[0], regexConvert);
        // 書き換えたあとの式に( ) がまだ残っているかを確認。残っていたらループしてなくなるまで処理継続
        strRegex = r.match(/([^\(\)]*)(?:\()([^\(\)]*)(?:\))/i);
      }
      break;
    default:
      break;
  }
  return r.replace(/&qformer;(.*?)&qlatter;/g, "($1)").replace(/\((\d+?)\)/g, "$1");
}
// 各種能力値の文字を切り分け、データを数値型で返却
function getAblSeparated(str, def = 0) {
  if(!str) { return [def]; }
  let result = str.match(/[\-\d]+/g).map(str => parseInt(str, 10));
  return result ? result : [def];
}
// 【基本能力値】【戦闘能力値】のチェック データは数値型で返却
function getAblParams(data) {
  let result = {};
  for(let i of KEY_ABILITY) {
    result[i] = data[abilityType(i)][i].total.match(/[\-\d]+/g).map(str => parseInt(str, 10));
  }
  let agapey = 0;
  for(let j of data.binds) {
      if(j.type === "絆") { agapey += 1; }
  }
  result.binds = [agapey];
  return result;
}
//魔獣化中かそうでないかの状態にあわせ、キーから戦闘能力値を取得
function getParamsByMode(params, key, mode = "h") {
  let p = params[key];
  return mode === "b" ? p[p.length-1] : p[0];
}
// 判定修正値の取得 key: 能力値の名称 mode: 人間か魔獣化状態か
function calcMod(key, mode="h") {
  let i = [];
  let data = JSON.parse(JSON.stringify(AppCore.modifiers.scoreList));
  // すべての判定に反映されるものを取得
  i.push(data.all.a);
  i.push(mode === "h" ? data.all.h : data.all.b);
  // 指定された【能力値】の、基本能力値全体・戦闘能力値全体にかかる判定修正を取得
  if(abilityType(key)) {
    i.push(data[abilityType(key)].a);
    i.push(mode === "h" ? data[abilityType(key)].h : data[abilityType(key)].b);
  }
  // 指定された【能力値】にかかる判定修正を取得
  if(data[key]) {
    i.push(data[key].a);
    i.push(mode === "h" ? data[key].h : data[key].b);
  }
  return i.reduce((sum, el) => sum + el, 0);
}
// ファンブル値の取得 key: 能力値の名称 mode: 人間か魔獣化状態か
function calcFumble(key, mode="h") {
  let i = 0;
  let a = false;
  let data = JSON.parse(JSON.stringify(AppCore.modifiers.artsFumble));
  // 各アーツごとにチェック
  // 《ダメ魔物》
  if(data.includes("ダメ魔物") && mode === "b") { i += 2; }
  // 《しまった、こんな時に！》　★ダメ魔物も持っているかどうかで適用方法が変わる
  if(data.includes("しまった、こんな時に！")) {
    if(data.includes("ダメ魔物") && mode === "h") {
      a = true; // 《ダメ魔物》《しまった、こんな時に》取得時
    } else if(!data.includes("ダメ魔物") && mode === "b") {
      a = true; // 《ダメ人間》《しまった、こんな時に》取得時
    }
  }
  // 《偉大なる血脈》
  if(data.includes("偉大なる血脈")) { i += 1; }
  // 《この世ならざるもの》
  if(data.includes("この世ならざるもの")) { a = true; }
  // 《不思議科学》
  if(data.includes("不思議科学")) { i += 1; }
  // 《身体強化処置》　★基本能力値のみ反映
  if(data.includes("身体改造処置") && abilityType(key) === "baseAbility") { i += 1; }
  // 《精神強化処置》　★戦闘能力値のみ反映
  if(data.includes("精神強化処置") && abilityType(key) === "battleAbility")  { i += 1; }
  // 《不安定なる高性能》　★暫定的に、魔獣化中のみ反映
  if(data.includes("不安定なる高性能") && mode === "b") { i += 1; }
  // 《契約代償：不運》
  if(data.includes("契約代償：不運")) { i += 2; }
  // 《秘されし真名》
  if(data.includes("秘されし真名") && mode === "b") { i += 1; }
  // 文字列の作成
  return { value: i, flag: a };
}
// 適切な括弧をアーツ・アイテム名に加える関数
function addAptBracketsToObjectName(obj, option = {blooming: false, ruby: false}) {
  if(!obj || !obj.name) { return ""; }
  let str = "";
  const sys = AppCore.settings.general.sessionTool;
  let template = { arts: "《%name%》", items: "「%name%」" };
  // テンプレートが存在するツールの場合、それを使う
  if(sys in DECLARATION_TEMPLATES) {
    Object.assign(template, DECLARATION_TEMPLATES[sys]);
  }
  // keyにcostがあるかをチェック
  if("cost" in obj) {
    // costがある＝アーツデータ
    str = template.arts.replace("%name%", pronouncingObjectName(obj, option.ruby));
  } else {
    // costがない＝アイテムデータ
    str = template.items.replace("%name%", pronouncingObjectName(obj, option.ruby));
  }
  // 吹き出し系の設定
  const Specialized = AppCore.settings.specialized;
  const Tool = AppCore.settings.general.sessionTool;
  if(option.blooming && Specialized[Tool] && Specialized[Tool].declareWithBlooming) {
    str = setupDeclareWithBlooming(str);
  }
  return str;
}
// ルビ振り用の処理
function pronouncingObjectName(obj, flag = true) {
  // ルビ機能に対応しないシステムの場合は対応しない
  if(!AppCore.settings.general.sessionTool in RUBY_TEMPLATE) {
    return obj.name;
  }
  // 自動ルビ振り機能のないツールは対応しない
  if(!AppCore.settings.specialized[AppCore.settings.general.sessionTool]) {
    return obj.name;
  }
  if(!("autoRuby" in AppCore.settings.specialized[AppCore.settings.general.sessionTool])) {
    return obj.name;
  }
  // 自動ルビ振りが設定されていないなら対応しない
  if(!AppCore.settings.specialized[AppCore.settings.general.sessionTool].autoRuby) {
    return obj.name;
  }
  // ルビ振り禁止令が出ている場合は対応しない
  if(!flag) { return obj.name; }
  // 名前から改行記号を削除
  let objName = obj.name.replace(/[\r\n]/g, "");
  // ルビ振り対象の正規表現一覧を取得
  const rubyRegexp = "cost" in obj ? RUBY_REGEXP.arts : RUBY_REGEXP.items;
  const rubyDictionary = "cost" in obj ? ARTS_WITH_RUBY : ITEMS_WITH_RUBY;
  const rubyTemplate = RUBY_TEMPLATE[AppCore.settings.general.sessionTool];
  // replaceで正規表現マッチングを行う
  objName = objName.replace(rubyRegexp, function(s) {
    // マッチングした正規表現を置き換えの候補とする
    let str = s;
    // 《血脈：●●》のような行頭マッチング記号が含まれているものはそのままだと置換できないので、ここをチェック
    if(!rubyDictionary[str]) {
      for(let i of Object.keys(rubyDictionary)) {
        if(i.match(s)) { str = i; break; }
      }
    }
    // テキストを置換
    return rubyTemplate.replace("%parent%", s).replace("%ruby%", rubyDictionary[str]);
  });
  return objName;
}
// 吹き出しを用いた宣言関連の設定
function setupDeclareWithBlooming(str) {
  const specialized = AppCore.settings.specialized;
  const tool = AppCore.settings.general.sessionTool;
  // let removed = str.replace(/^[《『]/, "").replace(/[》』]$/, "");
  let removed = str.replace(/(?<![|｜])[《『](.*)[》』]/g, "$1");
  if(specialized[tool].removeBracketWithDeclaration) {
    str = removed;
  }
  if(specialized[tool].addExclamationWithDeclaration && !removed.match(/[！？!?]$/)) {
    str += "！";
  }
  return `「${str}」`;
}

//「シーン登場時の人間性低下」のテキスト作成
function outputSceneEntry(data) {
  let result = [];
  if(AppCore.modifiers.artsFumble.includes("モータル") || isMortal(data)) {
    // モータルは人間性が無限大扱いなので、減らす人間性がないためシーン登場宣言のみ行う
    result = ["シーンに登場"];
  } else {
    result = [
      "1D6KH1 シーン登場時の人間性低下",
      "2D6KH1 【迫害状態】シーン登場時の人間性低下"
    ].map(str => (AppCore.systemConfig().autoScenePayment ? ":人間性-" : "") + str);
  }
  result = addSubHeaderAndFooterByTool("シーン登場時の処理", result);
  return result.join("\n");
}

// 判定文の作成 version 4.X
// data: キャラクターシート倉庫から取得したキャッシュデータ
function outputAllJudgeText(data) {
  // データの初期設定
  let textPoolHuman = [];
  let textPoolBeast = [];
  let resource = [];
  // (1) 通常の汎用判定の判定文を作成
  for(let i of KEY_ABILITY) {
    //console.log(i, abilityName(i, "j"));
    resource.push({str: `【${abilityName(i, "j")}】`, obj: void(0), type: "general"});
  }
  // (2) 堕落判定（オプションでOnにしている場合のみ）
  if(AppCore.settings.general.outputFalldownRoll) {
    resource.push({str: "【絆数】", obj: void(0), type: "general"});
  }
  // (3) アーツの判定
  for(let art of data.arts) {
    // 「アーツのデータがない」「名前・判定値のどちらかが空欄」「自動成功／効果参照」「判定値欄の記載が『0』のみ」は弾く
    if(!art || !art.name || !art.judge || art.judge.match(/(?:自動|成功|効果|参照)/) || art.judge === "0") { continue; }
    for(let s of splitArtsJudgeText(art)) {
      if(!art.judge) { continue; }
      resource.push({str: s, obj: art, type: "arts"});
    }
  }
  // (4) 武器の命中判定
  for(let weapon of data.weapons) {
    // 「武器のデータがない」「名前が空欄」「判定値欄の記載が『0』のみ」は弾く
    if(!weapon || !weapon.name || weapon.judge === "0") { continue; }
    let wepJudge = [];
    // console.log("チェック中の装備", weapon.name);
    // {能力値}から始まる判定式が記載されているかどうかをチェック
    const weaponList = splitArtsJudgeText(weapon);
    if(weaponList) {
      for(let s of splitArtsJudgeText(weapon)) {
        // if(!weapon.judge) { continue; }
        if(weapon.judge) {
          // console.log(weapon.judge);
          wepJudge.push({str: s, obj: weapon, type: "weapons"});
        }
      }
    }
    // {能力値}から始まる判定式がなかった場合、種別に準拠した式を作成する
    if(wepJudge.length === 0) {
      // 内容を記載
      let strWeapon = processStringScoreToPreText(weapon.judge);
      // console.log(strWeapon);
      // 判定値欄が数値のみの場合、それを定数として扱うかプラス修正として扱うかを確認
      if(strWeapon.match(/^\d+/) && AppCore.settings.damageRolls.judgeHeadNumber === "プラスの修正として扱う") {
        // console.log("check: 固定値チェック");
        strWeapon = "+" + strWeapon;
      }
      // 固定値での判定
      if(strWeapon.match(/^\d+/)) {
        wepJudge.push({str: strWeapon, obj: weapon, type: "weapons"});
      } else if(weapon.type) {
        // 白兵武器
        if(weapon.type.match(/白/)) {
          wepJudge.push({str: "【白兵】" + strWeapon, obj: weapon, type: "weapons"});
        }
        // 射撃武器
        if(weapon.type.match(/射/)) {
          wepJudge.push({str: "【射撃】" + strWeapon, obj: weapon, type: "weapons"});
        }
        // 乗り物（乗り物に限っては、既に式が作成されている場合は作らない）
        if(weapon.type.match(/乗/) && wepJudge.length === 0) {
          wepJudge.push({str: `【${checkVehicleAttackType(weapon)}】` + strWeapon, obj: weapon, type: "weapons"});
        }
      }
    }
    // console.log(wepJudge);
    // 武器・乗り物の判定式があるならば、それを全体の結果に加える
    if(wepJudge.length > 0) { resource = resource.concat(wepJudge); }
  }
  // それぞれの判定文を詳細に作成
  for(let r of resource) {
    // タイプチェック
    let check = checkJudgeTextAddType(r.type);
    // アーツか武器で、判定文作成タイプが「追加しない」の場合はスキップ
    if(r.type !== "general" && check === "追加しない") { continue; }
    // 人間状態の判定文をtry-catchで作成
    let strHuman;
    try {
      // 内容を作成
      strHuman = makeJudgeText(r.str, getAblParams(data), "h", r.type, r.obj);
      //console.log(r.str, strHuman);
    }
    catch(e) {
      console.log(e);
      // 内容を作成
      strHuman = {text: "**Error: 式作成に失敗しました**", note: `${r.obj.name} 判定`};
      alertFormulaErrors(r.obj, "判定");
    }
    // 魔獣化状態の判定文をtry-catchで作成
    let strBeast;
    try {
      // 内容を作成
      strBeast = makeJudgeText(r.str, getAblParams(data), "b", r.type, r.obj);
      //console.log(r.str, strBeast);
    }
    catch(e) {
      console.log(e);
      // 内容を作成
      strBeast = {text: "**Error: 式作成に失敗しました**", note: `${r.obj.name} 判定`};
      alertFormulaErrors(r.obj, "判定");
    }
    // 人間と魔獣の式に差がない場合、魔獣の式は追加されないように消去
    if(strBeast.text === strHuman.text) { strBeast.text = ""; }
    // アーツ・武器の判定式で、追加モードが「重複は省略」の場合、既に同等の式があれば省略
    if(r.type !== "general" && check === "重複は省略" && strHuman.text) {
      if(textPoolHuman.concat(textPoolBeast).join("\n").split(strHuman.text).length > 1) {
        strHuman.text = "";
      }
    }
    if(r.type !== "general" && check === "重複は省略" && strBeast.text) {
      if(textPoolHuman.concat(textPoolBeast).join("\n").split(strBeast.text).length > 1) {
        strBeast.text = "";
      }
    }
    // 生き残った式を追加。ソートタイプごとに分ける
    if(AppCore.settings.general.RollSortType === "【能力値】ごと") {
      if(strHuman.text) { textPoolHuman.push((strHuman.text + strHuman.note).replace(/\r?\n/g, '')); }
      if(strBeast.text) { textPoolHuman.push((strBeast.text + strBeast.note).replace(/\r?\n/g, '')); }
    } else {
      if(strHuman.text) { textPoolHuman.push((strHuman.text + strHuman.note).replace(/\r?\n/g, '')); }
      if(strBeast.text) { textPoolBeast.push((strBeast.text + strBeast.note).replace(/\r?\n/g, '')); }
    }
  }
  // 魔獣化用の式がひとつ以上ある場合、仕切り線を入れておく
  if(textPoolBeast.length > 0) { textPoolBeast.unshift("■《魔獣化》中専用の判定----------"); }
  // ヘッダ・フッタをつけて完成
  let textPool = addSubHeaderAndFooterByTool("一般的な判定", textPoolHuman.concat(textPoolBeast));
  return textPool.join("\n");
}
// 乗り物の白兵攻撃・射撃攻撃の判別
function checkVehicleAttackType(item) {
  // 種別に「魔艦」を含む場合、射撃武器
  if(item.type && item.type.match(/魔艦/)) { return "射撃"; }
  // 指定された名称の乗り物は、射撃攻撃扱いになる。名前か備考欄に含む場合、射撃攻撃
  // 備考欄を参照するのは、相当品ルールで名前が変わっている場合に備えて
  const Re = /(コスモマシン|アームドヴィークル|戦闘飛装脚|要塞宝具|未確認飛行物体)/;
  if(item.name && item.name.match(Re)) { return "射撃"; }
  if(item.notes && item.notes.match(Re)) { return "射撃"; }
  // これらのいずれでもないなら、白兵攻撃
  return "白兵";
}
// 判定文の作成に関するモードチェック
function checkJudgeTextAddType(type) {
  switch(type) {
    case "general":
      return "すべて追加";
    case "arts":
      return AppCore.settings.arts.outputJudgeText;
    case "weapons":
      return AppCore.settings.damageRolls.outputJudgeText;
  }
}
// アーツの判定値欄を切り分ける
function splitArtsJudgeText(obj) {
  // 余計な文字を除去＆四則演算を拾い上げるためのテキスト整備
  let strBase = processStringScoreToPreText(obj.judge)
    .replace(/[Ａ-Ｚａ-ｚ０-９＋－（）]/g, function(s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); } )
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/\(:(.*?)\)/g, '&qformer;$1&qlatter;');
  // 「LV」は置換する
  if("level" in obj) {
    if(obj.level && obj.level.replace(/[\r\n\s]/g, "").match(/^\d+$/)) {
      strBase = strBase.replace(/LV/ig, `${parseInt(obj.level.replace(/[\r\n\s]/g, ""), 10)}`);
    }
  }
  strBase = strBase.replace(/&qformer;(.*?)&qlatter;/g, "($1)");
  let result = strBase.match(/(\{\W{2}\}(?:[\+\-\*\/\d\(\)]*|@[\+\-\d]*|#[A]?[\+\-\d]*|&[1-6])*)/g);

  return result;
}
// 判定文作成時にエラーが生じた場合、それをエラー用の配列に追加する
function alertFormulaErrors(obj, mode = null) {
  let str = "";
  if(obj) {
    str += addAptBracketsToObjectName(obj); // アーツ・アイテムデータの場合
  } else {
    str += "（作成エラー）" + (mode ? mode : ""); // それ以外の場合
  }
  // 重複していなければ追加
  if(!AppCore.character.paletteError.includes(str)) {
    AppCore.character.paletteError.push(str);
  }
}
// 判定文の作成
function makeJudgeText(text, params, mode="h", type="general", obj=null) {
  // console.log(text, obj);
  /*
  引数について：
  text: 加工する式の原型
  params: データから抽出した【能力値】の一覧
  mode: 出力する式が人間状態か魔獣化状態かの判別。人間がh, 魔獣がb
  type: 式の形式。一般判定のgeneral、アーツ判定のarts、武器命中判定のweapons
  obj: アーツ・武器のデータがあればここに代入する
  */
  // 初期設定
  const sys = AppCore.systemConfig();
  let cri = 0;
  let fixedCri = false;
  let fum = 0;
  let fixedFum = false;
  let notFum = false;
  let min = 0;
  let abl = "";
  let result = [sys.prefix + "2BB"];
  // 魔獣化の有無を加味したテキストの編集
  text = separateBeastFormula(text, mode, obj);
  text = processStringScoreToPreText(text);
  // 使用する能力値の取得
  let matches = /\{(肉体|技術|感情|加護|社会|白兵|射撃|回避|行動|絆数)\}/.exec(text);
  if(matches) { abl = abilityName(matches[1], "e"); }
  // 基礎クリティカル値修正の取得
  text = text.replace(/@([\+\-\d]+)/, function(s, p1) {
    // console.log("critical check", s, p1);
    if(p1.match(/^\d/)) { fixedCri = true; }
    cri = parseInt(evalCalculation(p1.replace(/^\+/, "")), 10);
    // console.log("critical judge", {criticalValue: cri, fixedCritical: fixedCri});
    return "";
  });
  // 基礎ファンブル値修正の取得
  text = text.replace(/#(A)?([\+\-\d]+)/, function(s, p1, p2) {
    // console.log("fumble check", s, p1, p2);
    if(p1) { notFum = true; }
    if(p2.match(/^\d/)) { fixedFum = true; }
    fum = parseInt(evalCalculation(p2.replace(/^\+/, "")), 10);
    // console.log("fumble judge", {fumbleValue: fum, notFumble: notFum, fixedFumble: fixedFum});
    return "";
  });
  // ダイス最低保証の取得
  text = text.replace(/&([1-6])/, function(s, p1) {
    min = parseInt(p1, 10);
    return "";
  });
  // テキストの置換を開始
  text = text.replace(/\{(肉体|技術|感情|加護|社会|白兵|射撃|回避|行動|絆数)\}/, function(s) {
    if (mode === "b" && params[abl].length > 1) {
      result.push(`+{${abilityNameForReservedWord(abl, "b")}}`);
    } else {
      result.push(`+{${abilityNameForReservedWord(abl, "h")}}`);
    }
    return "";
  });
  // 残った空白文字を削除
  text = text.replace(/(\r?\n|\s+)/g, "");
  // console.log(text, obj);
  // 判定への修正値の挿入 - どこまで計算するかはオプションで指定
  if(text && AppCore.settings.general.outputCalculatedRoll) {
    // 修正値をすべて計算したうえでシンプルに表示
    let modBase = evalCalculation(text.replace(/^\+(.*)/, "$1").replace(/[^\d\+\-\*\/]/g, ""));
    let modSum = calcMod(abl, mode) + (modBase ? modBase : 0);
    if(modSum !== 0) {
      result.push(modSum > 0 ? `+${modSum}` : `${modSum}`);
    }
  } else if(text) {
    // 修正値を事前に計算しない場合
    // 剰余計算がある式は、その部分だけ括弧で括る
    if(text.match(/(\d+(?:[\*\/]\d+)+)/)) {
      text = text.replace(/(\d+(?:[\*\/]\d+)+)/g, "($1)");
    }
    result.push(text.match(/^[\+\-]/) ? text : `+${text}`);
    if(calcMod(abl, mode) !== 0) {
      result.push(calcMod(abl, mode) > 0 ? `+${calcMod(abl, mode)}` : `${calcMod(abl, mode)}`);
    }
  } else {
    if(calcMod(abl, mode) !== 0) {
      result.push(calcMod(abl, mode) > 0 ? `+${calcMod(abl, mode)}` : `${calcMod(abl, mode)}`);
    }
  }
  // 人間性の表記、クリティカル値の表記
  if(AppCore.modifiers.artsFumble.includes("どうして自分だけ！？")) {
    // 《どうして自分だけ？》取得者はクリティカルが発生しない
    result.push("@13");
  } else if(AppCore.modifiers.artsFumble.includes("モータル")) {
    // 《記憶封印》のないモータルは人間性が無限扱いとなり、人間性によるC値低下が生じない
    result.push("@12");
  } else if(sys.citeHumanity) {
    // チャットパレットに駒リソースの引用ができるツールは、人間性のリソースを引用してBOTに計算させる
    result.push("%{人間性}");
    if(fixedCri) {
      result.push(`@${cri}`);
    } else {
      if(cri !== 0) {
        result.push(cri > 0 ? `@+${cri}` : `@${cri}`);
      }
    }
  } else {
    // 人間性の引用ができない場合、@12-criで表記
    if(fixedCri) {
      result.push(`@${cri}`)
    } else {
      if(cri > 0) {
        result.push(`@12+${cri}`);
      } else if(cri < 0) {
        result.push(`@12${cri}`);
      } else if(cri === 0) {
        result.push(`@12`);
      }
    }
  }
  // ファンブル値の指定
  let f = calcFumble(abl, mode);
  if(fixedFum) {
    result.push("#" + ((f.flag || notFum) ? "A" : "") + (f.value + fum));
  } else {
    if(f.value + fum !== 0 | f.flag) {
      result.push("#" + ((f.flag || notFum) ? "A" : "") + (f.value + fum >= 0 ? `+${f.value+fum}` : `${f.value+fum}`));
    }
  }
  // 出目の最低保証値の指定
  if(min > 0) { result.push(`&${min}`); }
  // 判定解説文前の半角スペースを追加
  result.push(" ");
  // 判定解説文を追加
  let judgeNotes = "";
  if(type === "general") {
    // 一般的な判定
    if(abl === "binds") {
      judgeNotes = "堕落判定（絆数の部分は必要に応じて書き換えること）" + (mode === "b" ? "（《魔獣化》中）" : "");
    } else {
      judgeNotes = `【${abilityName(abl, "j")}】判定` + (mode === "b" ? "（《魔獣化》中）" : "");
    }
  } else {
    // アーツ、武器の判定
    judgeNotes = `${addAptBracketsToObjectName(obj)}判定`;
    // 種別：魔獣を含むかどうか確認し、《魔獣化》専用かつ人間状態の式は削除する
    // なお、魔獣化中専用の装備については、（《魔獣化》中）の備考を記載しない
    if(obj.type && obj.type.match(/魔獣/)) {
      if(mode === "h") { result = []; }
    } else {
      if(mode === "b") { judgeNotes += "（《魔獣化》中）"; }
    }
  }
  // 結果を結合。+が複数重複している場合や、+-などになっているところは+ひとつに置き換え
  return {
    text: result.join("").replace(/(\+{2,}|\+\-)/g, "+"),
    note: judgeNotes
  };
}

// 一般的な行動の出力
function outputGeneralActions(data) {
  // フラグを短縮して拾っておく
  const specialized = AppCore.settings.specialized;
  const tool = AppCore.settings.general.sessionTool;
  // 基本的な行動
  let result = [
    "※アクションなし",
    "ムーブ - 通常移動",
    "メジャー - 離脱移動"
  ];
  // 武器の攻撃宣言文
  for(let weapon of data.weapons) {
    // データがないか、名前がないか、種別がないかのいずれかを満たす場合はスキップ
    // 攻撃データのない「ラフィンガス」「スケアガス」が出てきたので、攻撃力の式が入っていない武器も宣言には入れる
    if(!weapon || !weapon.name || !weapon.type) { continue; }
    let declarations = [];
    let str = addAptBracketsToObjectName(weapon, {blooming: false, ruby: true});
    // 白兵攻撃宣言
    if(weapon.type.match(/白/)) {
      let strCombat = `${str}で白兵攻撃`;
      if((tool in specialized) && specialized[tool].declareWithBlooming) {
        strCombat = setupDeclareWithBlooming(strCombat);
      }
      declarations.push(`メジャー - ${strCombat}`);
    }
    // 射撃攻撃宣言
    if(weapon.type.match(/射/)) {
      let strShoot = `${str}で射撃攻撃`;
      if((tool in specialized) && specialized[tool].declareWithBlooming) {
        strShoot = setupDeclareWithBlooming(strShoot);
      }
      declarations.push(`メジャー - ${strShoot}`);
    }
    // 乗り物を追加するのは、同時に白兵・射撃の種別がついていないときのみ（二重の追加を防ぐ）
    if(weapon.type.match(/乗/) && !weapon.type.match(/[白射]/)) {
      let attackType = checkVehicleAttackType(weapon);
      let strVehicle = `${str}で${attackType}攻撃`;
      if((tool in specialized) && specialized[tool].declareWithBlooming) {
        strVehicle = setupDeclareWithBlooming(strVehicle);
      }
      declarations.push(`メジャー - ${strVehicle}`);
    }
    if(declarations.length > 0) {
      result = result.concat(declarations);
    }
  }
  result = addSubHeaderAndFooterByTool("一般的な行動", result);
  return result.join("\n");
}

// アーツ・アイテム宣言文の出力
function outputObjects(data, category) {
  let result = [];
  const objects = category === "アーツ一覧" ? data.arts : data.items;
  for(let i of objects) {
    // データが空、名称が空の場合は出力しない
    if(!i || !i.name) { continue; }
    // タイミングが空のアーツを出力するかどうかの設定
    if(!i.timing && AppCore.settings.arts.exceptTimingEmpty) { continue; }
    // タイミングが「常時」のアーツを出力するかどうかの設定
    if(i.timing === "常時" && AppCore.settings.arts.exceptTimingAuto) { continue; }
    // 要素ごとに分解して、宣言文データを作成
    let strings = AppCore.settings.arts.outputOrders.map(element => makeActionElementText(element, i));
    result.push(strings.join(""));
  }
  // 中身のある配列が作れたら、ヘッダフッタを作成
  if(result.length > 0) {
    result = addSubHeaderAndFooterByTool(category, result);
  }
  return result.join("\n");
}
// アーツ宣言文を要素ごとに出力 element: 要素, obj: アーツ・アイテムデータ
function makeActionElementText(element, obj) {
  if(!element || !obj) { return ""; }
  if(!element.output) { return ""; }
  if(!["target&range", "other"].includes(element.type) && !obj[element.type]) {
    return "";
  }
  if(element.type === "cost" && !("cost" in obj)) {
    return "";
  }
  if(element.type === "target" || element.type === "target&range") {
    if(AppCore.settings.arts.exceptSelfEffect && obj.target === "自身") {
      return "";
    }
  }
  let str = element.text;
  switch(element.type) {
    case "target&range":
      // 対象＆射程
      if(!obj.target && !obj.range) {
        str = "";
      } else {
        let result = [];
        if(obj.target) { result.push(obj.target); }
        if(obj.range) { result.push(obj.range); }
        str = element.text.replace("%text%", result.join("／").replace(/\r?\n/g, ""));
      }
      break;
    case "cost":
      // アーツのコスト。ここに書く意味がないので、常時アーツのコストは表記しない
      if(obj.timing === "常時") { str = ""; break; }
      // ユドナリリィは独自のコスト支払い構文を持つため、オンセツール名称によって特別対応
      switch(AppCore.settings.general.sessionTool) {
        case "ユドナリウムリリィ":
          if(AppCore.settings.specialized["ユドナリウムリリィ"].outputCostAsUsual) {
            str = element.text.replace("%text%", makeCostTextForDefault(obj.cost));
          } else {
            str = element.text.replace("%text%", makeCostTextForLily(obj.cost));
          }
          break;
        default:
          str = element.text.replace("%text%", makeCostTextForDefault(obj.cost));
          break;
      }
      break;
    case "other":
      // その他のテキスト。置換などは行われないもの
      break;
    case "name":
      // オブジェクト名称。ルビ振り等もここで処理する
      str = element.text.replace("%text%", addAptBracketsToObjectName(obj, {blooming: true, ruby: true}));
      // アーツの場合、レベル表記を追加
      if("level" in obj) {
        if(!obj.level) { break; }
        let objLevel = parseInt(obj.level, 10);
        switch(AppCore.settings.arts.displayLevel) {
          case "すべて省略":
            break;
          default:
            if(objLevel < 1) { break; }
            str += AppCore.settings.arts.displayLevel === "『LV1』のみ省略" && objLevel === 1 ? "" : `LV${objLevel}`;
            break;
        }
      }
      break;
    case "notes":
      // アーツ・アイテム欄の備考。(:～～)の構文だけ外す
      str = element.text.replace("%text%", obj.notes).replace(/\(:(.*?)\)/g, "($1)");
      break;
    default:
      // 基本的な対応は、そのアーツ・アイテムの対応する欄を転記
      str = element.text.replace("%text%", `${obj[element.type].replace(/\r?\n/g, "")}`);
      break;
  }
  return str;
}
// コスト式の作成 cost: コストの文字列
function makeCostTextForDefault(cost) {
  // モータルかどうかを確認
  let mortal = (isMortal(AppCore.character.mainData) || AppCore.modifiers.artsFumble.includes("モータル"));
  if(cost.match(/^[\+\-]?\d+$/)) {
    let r = [...cost.matchAll(/^[\+\-]?\d+$/g)].reduce((acc, cur) => parseInt(acc,10) + parseInt(cur,10), 0);
    return mortal ? `コスト：【FP】${r*2}点` : `コスト：${r}`;
  } else if(cost.match(/^[^\+\-][D\d\+]+$/i)) {
    return mortal ? `コスト：【FP】(${cost})×2点` : `コスト：${cost}`;
  } else {
    return `コスト：${cost}`;
  }
}
// コスト式の作成（ユドナリウムリリィ用） cost: コストの文字列
function makeCostTextForLily(cost) {
  // 結果を格納する配列を確保
  let result = ["コスト"];
  // モータルであるかどうかを判定しておく
  let mortal = (isMortal(AppCore.character.mainData) || AppCore.modifiers.artsFumble.includes("モータル"));
  // 「コスト：効果参照」はそのままリターン
  if(cost.match(/効果参照/)) { return "コスト：効果参照"; }
  // 空白文字と改行の削除
  cost = cost.replace(/\r?\n|\s+/g, "");
  // 愛・罪・大罪コストの抽出
  cost = cost.replace(/(愛|罪|大罪)/g, function(s, p1) {
    result.push(`:${p1}-1`);
    return "";
  });
  // 定数の反動ポイントをコストにする場合の抽出
  cost = cost.replace(/反動(\d+)/g, function(s, p1) {
    result.push(`:反動-${p1}`);
    return "";
  });
  // 行頭の + を削除
  cost = cost.replace(/^\+/, "");
  // 条件分けして人間性コストのアーツの記載を整理
  if(cost.match(/^([\+\-]?\d+)+$/)) {
    // コストの記載が数値と正負記号のみの場合、合算する。 モータルの【FP】コストにも対応
    const r = [...cost.matchAll(/([\+\-]?\d+)/g)].reduce((acc, cur) => parseInt(acc, 10) + parseInt(cur, 10), 0);
    result.push(mortal ? `:FP-${r*2}` : `:人間性-${r}`);
  } else if(cost.match(/^[^\+\-][D\d\+]+$/i)) {
    // 1D6+5 や 2D6 のような、ダイスでコストが決まるようなアーツを想定した構文。先頭が±以外で、数字・D・+で攻勢されるコスト式が対象
    // この場合、( )書きで囲んで対応する。モータルの【FP】コストにも対応
    result.push(mortal ? `:FP-(${cost})*2` : `:人間性-(${cost})`);
  } else {
    // それ以外の場合、リソース操作にならないような形で記載
    result.push(`${cost}`);
  }
  // 配列を連結した文字列に変換して返す
  return result.join(" ");
}

// リアクション宣言文の出力
function outputGeneralReactions(data) {
  // フラグを短縮して拾っておく
  const specialized = AppCore.settings.specialized;
  const tool = AppCore.settings.general.sessionTool;
  // 基本的な行動
  let result = [
    "リアクション放棄", "ドッジ"
  ].map(str => {
    if((tool in specialized) && specialized[tool].declareWithBlooming) {
      str = setupDeclareWithBlooming(str);
    }
    return `リアクション - ${str}`;
  });
  // ガード関連のアクションを追記
  const guardWeapons = [];
  for(let weapon of data.weapons) {
    // データ、名前、ガード値のいずれかのデータがないものはスキップ
    if(!weapon || !weapon.name || !weapon.guard) { continue; }
    // 人間状態のガード値を取得
    const guardHumanText = separateBeastFormula(weapon.guard, "h", weapon)
    let guardHumanValue;
    try {
      guardHumanValue = evalCalculation(guardHumanText.replace(/^[\+\*\/]/, ""));
    }
    catch(e) {
      console.log(e);
      guardHumanValue = void 0;
    }
    // 魔獣化中のガード値を取得
    const guardBeastText = separateBeastFormula(weapon.guard, "b", weapon)
    let guardBeastValue;
    try {
      guardBeastValue = evalCalculation(guardBeastText.replace(/^[\+\*\/]/, ""));
    }
    catch(e) {
      console.log(e);
      guardBeastValue = void 0;
    }
    // 人間状態と魔獣化中のデータを比較
    // 魔獣化中専用の装備は、人間状態では使用しない
    if(weapon.type && weapon.type.match(/魔獣/)) {
      guardHumanValue = void 0;
    }
    // 人間状態と魔獣化中のデータが同じ場合、魔獣化中のデータを消去
    if(guardHumanValue === guardBeastValue) {
      guardBeastValue = void 0;
    }
    // ガード用データを確保
    if(guardHumanValue) {
      guardWeapons.push({value: guardHumanValue, mode: "h", obj: weapon});
    }
    if(guardBeastValue) {
      guardWeapons.push({value: guardBeastValue, mode: "b", obj: weapon});
    }
  }
  // ガード値のテキストを順次作成
  for(let w of guardWeapons) {
    let str = addAptBracketsToObjectName(w.obj, {blooming: false, ruby: true}) + "でガード";
    if((tool in specialized) && specialized[tool].declareWithBlooming) {
      str = setupDeclareWithBlooming(str);
    }
    let guardText = `リアクション - ${str}`;
    if(w.mode === "b") { guardText += "【魔獣化中】"; }
    guardText += `（ガード値：${w.value}）`;
    if(guardText) { result.push(guardText); }
  }
  // 結果を返す
  result = addSubHeaderAndFooterByTool("一般的なリアクション", result);
  return result.join("\n");
}

// ダメージロール式の作成
function outputDamageRolls(data) {
  // 配列用意
  let result = [];
  let resources = [];
  // 武器データを取得
  for(let weapon of data.weapons) {
    // データ、名称、攻撃力、属性のいずれかがない場合はスキップ
    if(!weapon || !weapon.name || !weapon.attack || !weapon.attribute) { continue; }
    resources.push({text: weapon.attack, obj: weapon, attr: weapon.attribute});
  }
  // アーツ・一般アイテムの欄からデータを抽出
  if(AppCore.settings.damageRolls.includeSpAttack) {
    resources = resources.concat(
      extractSpecialAttackDamageRolls(data.arts),
      extractSpecialAttackDamageRolls(data.items)
    );
  }
  // 式を作成
  const abilities = getAblParams(data);
  for(let r of resources) {
    let h = makeDamageRollsText(r.text, r.obj, abilityName(r.attr, "e"), abilities, "h");
    let b = makeDamageRollsText(r.text, r.obj, abilityName(r.attr, "e"), abilities, "b");
    // 種別：魔獣のデータは、人間状態のデータを参照しないため消去する
    if(r.obj.type && r.obj.type.match(/魔獣/)) { h.text = ""; }
    // 人間状態のテキストがあり、人間状態と魔獣化中のテキストが一致するなら、魔獣化中のデータは不要なので消去
    if(h.text && h.text === b.text) { b.text = ""; }
    // 残ったデータを挿入
    if(h.text) { result.push((`${h.text} ${h.note}`).replace(/\r?\n/g, "")); }
    if(b.text) { result.push((`${b.text} ${b.note}`).replace(/\r?\n/g, "")); }
  }
  // 結果の作成
  if(result.length > 0) {
    result = addSubHeaderAndFooterByTool("ダメージロール一覧", result);
  }
  return result.join("\n");
}
// 特殊攻撃などのダメージ式をアーツの効果欄から抽出する
function extractSpecialAttackDamageRolls(objects) {
  let result = [];
  // データを抽出開始
  for(let obj of objects) {
    // データがない、名称がない、備考欄がない のいずれかに該当する場合はスキップ
    if(!obj || !obj.name || !obj.notes) { continue; }
    // 式を検索
    let sp = obj.notes.match(/(?:\[|［)(.*?)(?:\]|］)/);
    // 式が取得できなかったか、取得した式に数字・±符号・●d（ダイスロール式）のどれも入っていない場合はスキップ
    if(!sp || !sp[1].match(/[\d\+\-]/) || !sp[1].match(/\d+d/i)) { continue; }
    // 属性の指定があるかをチェック
    let attributeMatch = obj.notes.match(/[<〈](肉体|技術|感情|加護|社会)[〉>]/);
    let attribute = attributeMatch ? abilityName(attributeMatch[1], "e") : "";
    // データを追加
    result.push({text: sp[1], obj: obj, attr: attribute});
  }
  return result;
}
// ダメージロール式の作成
function makeDamageRollsText(text, obj, attr, params, mode="h") {
  // 使用するデータをチェック
  // 式の先頭が正負符号で始まり、objがアイテムデータの場合、攻撃属性をダメージの基準として挿入
  if(text.match(/^[\+\-]/) && ("attack" in obj)) {
    switch(mode) {
      case "h":
        // 人間状態はそのまま挿入
        text = `${abilityName(attr, "j")}` + text;
        break;
      case "b":
        // 魔獣化中は、paramsの内容を確認
        text = (params[attr].length > 1 ? `${abilityNameForReservedWord(attr, "b")}` : `${abilityNameForReservedWord(attr, "h")}`) + text;
        break;
    }
  }
  // modeにあわせてテキストを加工
  let str = separateBeastFormula(text, mode, obj).replace(/\+{2,}/g, "+");
  // TRPGスタジオのみ、式の前に記号が必要
  if(AppCore.settings.general.sessionTool === "TRPGスタジオ") { str = "/d " + str; }
  // 説明用テキストの出力
  let note = addAptBracketsToObjectName(obj, {blooming: false, ruby: false});
  if(mode === "b") { note += "【魔獣化中】"; }
  if(attr) { note += `／〈${abilityName(attr, "j")}〉属性`; }
  if("attack" in obj && obj.notes && AppCore.settings.damageRolls.includeNotes) {
    note += `：${obj.notes}`;
  }
  return {text: str, note: note};
}

// 愛・罪の効果の出力
function outputAgapeyAndGuilty(data) {
  const tool = AppCore.settings.general.sessionTool;
  // 愛の効果を列挙
  let agapey = [
    {name: "◆絆の修復", before: "愛の効果", after: ""},
    {name: "◆解放状態", before: "愛の効果", after: ""}
  ];
  if(isMortal(data) || AppCore.modifiers.artsFumble.includes("モータル") || getAllArtsNameList(data).includes("愛という拠り所")) {
    agapey.push(
      {name: "◆判定のクリティカル値を8に変更", before: "《愛という拠り所》", after: ""},
      {name: "◆他者のかりそめの死を回復", before: "《愛という拠り所》", after: "（シーン1回）"},
      {name: "◆他者の人間性回復をさらに+2D6", before: "《愛という拠り所》", after: "（シナリオ1回）"}
    );
  }
  if(!isMortal(data) && !AppCore.modifiers.artsFumble.includes("モータル")) {
    agapey.push({name: "◆罪の効果を他者に適用", before: "愛の効果", after: ""});
  }
  let effectAgapey = agapey.map(obj => obj.before + addAptBracketsToObjectName(obj, {blooming: true, ruby: false}) + obj.after + (tool === "ユドナリウムリリィ" ? " :愛-1" : ""));
  // 罪の効果を列挙
  let guilty = [];
  if(!isMortal(data) && !AppCore.modifiers.artsFumble.includes("モータル")) {
    guilty = [
      {name: "◆達成値増大", before: "罪の効果", after: ""},
      {name: "◆ダメージ増強", before: "罪の効果", after: ""},
      {name: "◆移し替え無効", before: "罪の効果", after: ""},
      {name: "◆回復", before: "罪の効果", after: ""},
      {name: "◆復活", before: "罪の効果", after: ""},
      {name: "◆真の死の回避", before: "罪の効果", after: ""}
    ];
  }
  let effectGuilty = guilty.map(obj => obj.before + addAptBracketsToObjectName(obj, {blooming: true, ruby: false}) + obj.after + (tool === "ユドナリウムリリィ" ? " :罪-1" : ""));
  // 結果を返す
  let result = [].concat(effectAgapey, effectGuilty);
  result = addSubHeaderAndFooterByTool("愛・罪の効果", result);
  return result.join("\n");
}

// 汎用リソース操作パレット
function outputResourceOperator(data) {
  // リソース操作コマンドの機能に対応していないツールでは作成しない
  if(!AppCore.systemConfig().resourceController) { return void 0; }
  // 操作するリソースを取得
  const resources = [":FP", ":人間性", ":財産点", ":愛"];
  // 《記憶封印》されていないモータルではないなら「罪」を追加
  if(!isMortal(data) && !AppCore.modifiers.artsFumble.includes("モータル")) { resources.push(":罪"); }
  // 大罪のデータを持つなら「大罪」を追加
  if(hasGreatGuilty(data)) { resources.push(":大罪"); }
  // 呪われし者なら「反動」を追加
  if(isCursedOne(data)) { resources.push(":反動"); }
  // 堕落判定用の判定文を作成するなら「絆数」を追加
  if(AppCore.settings.general.outputFalldownRoll) { resources.push(":絆数"); }
  // 結果発表
  let result = addSubHeaderAndFooterByTool("リソース操作コマンド", resources);
  return result.join("\n");
}

// 予約語と対応文字列の出力を行う
function outputReservedValues(data) {
  let result = [];
  const params = getAblParams(data);
  const sys = AppCore.systemConfig();
  // 予約語に対応していないか、チャットパレットに予約語の変数を記載できないツールを使用しているなら省略
  if(!sys.reservedWords || !sys.paramPalette) { return ""; }
  // 駒にステータスやパラメータを引用できないツールの場合、全ての人間状態の能力値も掲載
  if(!sys.paramPawn) {
    for(let i of KEY_ABILITY) {
      result.push(`//${abilityName(i)}=${params[i][0]}`);
    }
    // 堕落判定式を作るのであれば、絆数も挿入
    if(AppCore.settings.general.outputFalldownRoll) {
      result.push(`//絆数=${params.binds[0]}`);
    }
  }
  // 魔獣化状態の値を作成
  if(sys.paramPalette) {
    for(let i of KEY_ABILITY) {
      // 人間状態と魔獣化中の能力値が変化しないなら、スキップ
      if(params[i].length === 1) { continue; }
      // 魔獣化中と人間状態の差分を取得。差分0ならやっぱりスキップ
      let a = params[i][1] - params[i][0];
      if(a === 0) { continue; }
      result.push(`//${abilityNameForReservedWord(i, "b")}={${abilityName(i)}}` + (a > 0 ? `+${a}` : `${a}`));
    }
  }
  // 結果を転送
  if(result.length > 0) {
    result = addSubHeaderAndFooterByTool("能力値関連", result);
  }
  return result.join("\n");
}

// チャットパレット本文において、予約語を実数値に書き換える必要がある場合の処理
function replaceReservedWordsToValue(text, data) {
  let result = text.replace(/\{(肉体|技術|感情|加護|社会|白兵|射撃|回避|行動|魔肉|魔技|魔感|魔加|魔社|魔白|魔射|魔回|魔行)\}/g, function(s, p1) {
    if(abilityName(p1, "e")) {
      return `${getAblParams(data)[abilityName(p1, "e")][0]}`;
    }
    for(let a of KEY_ABILITY) {
      if(p1 === abilityNameForReservedWord(a, "b")) {
        return `${getAblParams(data)[a][1]}`;
      }
    }
    return "0";
  });
  return result;
}

// キャラクター駒作成：絆・エゴ情報の整理
function sortBindsData(data) {
  let result = [];
  for(let i = 0; i < Math.max(7, data.binds.length); i++) {
    if(data.binds[i]) {
      if(!data.binds[i].type) {
        result.push({type: "絆", name: "（絆未取得枠）"});
      } else {
        result.push(data.binds[i]);
      }
    } else if (i < 7) {
      result.push({type: "絆", name: "（絆未取得枠）"});
    }
  }
  return result;
}
// キャラクター駒作成：キャラクター情報のテキスト化（ココフォリア・ユドナイト用）
function pawnQuoteMemo(mode) {
  const data = AppCore.character.mainData;
  switch(mode) {
    case "profile":
      let p = [];
      // キャラクター名
      let profileName = "【名前】" + (data.base.nameKana ? `“${data.base.nameKana}” ` : "") + (data.base.name ? data.base.name : "");
      if(data.base.name) { p.push(profileName); }
      // 年齢・性別・カヴァー
      if(data.base.age) { p.push(`【年齢】${data.base.age}`); }
      if(data.base.sex) { p.push(`【性別】${data.base.sex}`); }
      if(data.base.cover) { p.push(`【カヴァー】${data.base.cover}`); }
      // 仕切り線の追加
      p.push("-".repeat(20));
      // 結合
      return p.join("\n");
    case "binds":
      let r = [];
      // 絆・エゴデータを読み込む
      for(let i of sortBindsData(data)) {
        // 絆の種類やデータがない場合はスキップ
        if(!i || !i.type) { continue; }
        // 絆・エゴの情報を文字列化
        r.push(`【${i.type}】` + (i.name ? `${i.name}` : "") + (i.relation ? `（関係：${i.relation}）` : ""));
        // 絆の場合、エゴ化後のテキスト欄も作る
        if(i.type.match(/絆/)) { r.push("＞【エゴ】"); }
        // 仕切り線の追加
        r.push("-".repeat(20));
      }
      return r.join("\n");
    case "kinds":
      let k = getCharacterKinds(data).filter(function(x, i, self) {
        return self.indexOf(x) === i;
      });
      return k.length > 0 ? [`【種別】${k.join("/")}`, "-".repeat(20)].join("\n") : "";
    case "SA":
      return ["【SA】", "-".repeat(20)].join("\n");
  }
}

// ココフォリア用駒データの基本形準備
function setupCcfoliaPawn(data) {
  AppCore.character.pawnData.name = data.base.name;
  // ステータスの設定
  ccfoliaPawnStatus(data);
  // パラメータの設定
  ccfoliaPawnParams(data);
}
// ココフォリア用駒データ：ステータス、パラメータの設定
function ccfoliaPawnStatus(data) {
  // 「ステータス」は、変動の頻度が多い数値の項目を指す。イニシアティブ一覧において、ゲージで表示される。
  let params = getAblParams(data);
  // 【FP】は初期値を設定
  let fp = getAblSeparated(data.fp.total)[0];
  AppCore.character.pawnData.status.push({label: "FP", value: fp, max: fp});
  // 人間性 … 《記憶封印》のないモータルの場合は、人間性が∞扱いで実質的に参照しないため省略
  if(!isMortal(data) && !AppCore.modifiers.artsFumble.includes("モータル")) {
    let hum = getAblSeparated(data.humanity.total, 60)[0];
    AppCore.character.pawnData.status.push({label: "人間性", value: hum, max: hum});
  }
  // 愛・罪・大罪
  let agapeyMax, guiltyMax, greatGuilty;
  // 大罪を持っているか？
  if(hasGreatGuilty(data)) {
    // 《無垢なる魂》持ち（大罪かつ《記憶封印》でないモータル）かどうかで条件分けして最大値チェック
    agapeyMax = (isMortal(data) || AppCore.modifiers.artsFumble.includes("モータル")) ? 6 : 5;
    guiltyMax = (isMortal(data) || AppCore.modifiers.artsFumble.includes("モータル")) ? 0 : 6;
    greatGuilty = (isMortal(data) || AppCore.modifiers.artsFumble.includes("モータル")) ? 0 : 1;
  } else {
    // それ以外の場合、モータルに罪がない以外は基本的に愛６点、罪７点が最大
    agapeyMax = 6;
    guiltyMax = (isMortal(data) || AppCore.modifiers.artsFumble.includes("モータル")) ? 0 : 7;
    greatGuilty = 0;
  }
  // 最大値が0でない場合のみステータスに追加
  if(agapeyMax) {
    AppCore.character.pawnData.status.push({label: "愛", value: params.binds[0], max: agapeyMax});
  }
  if(guiltyMax) {
    AppCore.character.pawnData.status.push({label: "罪", value: 0, max: guiltyMax});
  }
  if(greatGuilty) {
    AppCore.character.pawnData.status.push({label: "大罪", value: 0, max: greatGuilty});
  }
  // 財産点
  AppCore.character.pawnData.status.push({label: "財産点", value: params.society[0], max: params.society[0]});
  // 反動ポイント（呪われし者のみ）
  if(isCursedOne(data)) {
    AppCore.character.pawnData.status.push({label: "反動", value: 0, max: 0});
  }
  // 絆数
  if(AppCore.settings.general.outputFalldownRoll) {
    AppCore.character.pawnData.status.push({label: "絆数", value: params.binds[0], max: agapeyMax});
  }
}
function ccfoliaPawnParams(data) {
  // 「パラメータ」は、変動の頻度が少ない項目を指し、文字列が許容される。
  let params = getAblParams(data);
  // 【能力値】データをここに紐づけておく
  for(let i of KEY_ABILITY) {
    let p = {label: `${abilityName(i)}`, value: `${params[i][0]}`};
    AppCore.character.pawnData.params.push(p);
    if(params[i].length > 1) {
      let a = params[i][1] - params[i][0];
      if(a === 0) { continue; }
      let b = {label: `${abilityNameForReservedWord(i, "b")}`, value: `{${abilityName(i)}}`+(a > 0 ? `+${a}` : `${a}`)};
      AppCore.character.pawnData.params.push(b);
    }
  }
}
// ココフォリア用テキストデータの作成
function createTextForCcfoliaPawn(data) {
  const k = JSON.parse(JSON.stringify(AppCore.character.pawnData));
  const clip = {
    kind: "character",
    data: {
      name: k.name,
      memo: k.memo,
      initiative: getAblParams(data).action[0],
      externalUrl: AppCore.character.mainDataUrl,
      status: k.status,
      params: k.params,
      width: k.size,
      height: k.size,
      active: k.active,
      secret: k.secret,
      invisible: k.invisible,
      hideStatus: k.hideStatus,
      color: k.color,
      commands: AppCore.character.palette
    }
  };
  return JSON.stringify(clip);
}

// ユドナリウム系の駒データ作成開始
function setupUdonariumPawn(data) {
  AppCore.character.pawnData.name = data.base.name;
  // ステータスの設定
  udonariumPawnStatus(data);
  // パラメータの設定
  udonariumPawnParams(data);
  // 絆・エゴデータの設定（ユドナイトでメモ欄を使用して出力する場合を除く）
  const udoniteCheck = (AppCore.character.lastTool === "ユドナイト" && AppCore.settings.specialized["ユドナイト"].bindsOutputAsInnerNotes);
  if(!udoniteCheck) {
    udonariumPawnBindsData(data);
  }
  // ツールごとに必要なデータを設定
  if(AppCore.character.lastTool === "ユドナリウムリリィ") {
    autoInsertLilyBuffPalette();
  }
  if(AppCore.character.lastTool === "ユドナイト") {
    filterUdoniteLimitResourcesControl(data);
  }
}
// ユドナリウム系のキャラクター基本ステータスの取得
function udonariumPawnStatus(data) {
  // 基本的な分け方はココフォリアの駒作成と同じ
  // 「ステータス」は、変動の頻度が多い数値の項目を指す。イニシアティブ一覧において、ゲージで表示される。
  let params = getAblParams(data);
  // 【FP】は初期値を設定
  let fp = getAblSeparated(data.fp.total)[0];
  AppCore.character.pawnData.status.push({label: "FP", type: "numberResource", value: fp, max: fp});
  // 人間性 … 《記憶封印》のないモータルの場合は、人間性が∞扱いで実質的に参照しないため省略
  if(!isMortal(data) && !AppCore.modifiers.artsFumble.includes("モータル")) {
    let hum = getAblSeparated(data.humanity.total, 60)[0];
    AppCore.character.pawnData.status.push({label: "人間性", type: "number", value: hum, max: 0});
  }
  // 愛・罪・大罪
  let agapeyMax, guiltyMax, greatGuilty;
  // 大罪を持っているか？
  if(hasGreatGuilty(data)) {
    // 《無垢なる魂》持ち（大罪かつ《記憶封印》でないモータル）かどうかで条件分けして最大値チェック
    agapeyMax = (isMortal(data) || AppCore.modifiers.artsFumble.includes("モータル")) ? 6 : 5;
    guiltyMax = (isMortal(data) || AppCore.modifiers.artsFumble.includes("モータル")) ? 0 : 6;
    greatGuilty = (isMortal(data) || AppCore.modifiers.artsFumble.includes("モータル")) ? 0 : 1;
  } else {
    // それ以外の場合、モータルに罪がない以外は基本的に愛６点、罪７点が最大
    agapeyMax = 6;
    guiltyMax = (isMortal(data) || AppCore.modifiers.artsFumble.includes("モータル")) ? 0 : 7;
    greatGuilty = 0;
  }
  // 最大値が0でない場合のみステータスに追加
  if(agapeyMax) {
    AppCore.character.pawnData.status.push({label: "愛", type: "number", value: params.binds[0], max: 0});
  }
  if(guiltyMax) {
    AppCore.character.pawnData.status.push({label: "罪", type: "number", value: 0, max: 0});
  }
  if(greatGuilty) {
    AppCore.character.pawnData.status.push({label: "大罪", type: "number", value: 0, max: 0});
  }
  // 財産点
  AppCore.character.pawnData.status.push({label: "財産点", type: "number", value: params.society[0], max: 0});
  // 反動ポイント（呪われし者のみ）
  if(isCursedOne(data)) {
    AppCore.character.pawnData.status.push({label: "反動", type: "number", value: 0, max: 0});
  }
  // 絆数
  if(AppCore.settings.general.outputFalldownRoll) {
    AppCore.character.pawnData.status.push({label: "絆数", type: "numberResource", value: params.binds[0], max: agapeyMax});
  }
  // 種別
  const kinds = getCharacterKinds(data).filter(function(x, i, self) {
    return self.indexOf(x) === i;
  });
  if(kinds.length > 0) {
    AppCore.character.pawnData.status.push({label: "種別", type: "normal", value: kinds.join("/"), max: 0})
  }
  // イニシアティブ用
  if(AppCore.settings.outputPawn.initiative) {
    AppCore.character.pawnData.status.push({label: AppCore.settings.outputPawn.initiativeName, type: "number", value: params.action[0], max: 0});
  }
}
// ユドナリウム系の【能力値】データ取得
function udonariumPawnParams(data){
  // 基本的な分け方はココフォリアと同じだが、《魔獣化》中の値を拾う必要はない
  let params = getAblParams(data);
  // 【能力値】データをここに紐づけておく
  for(let i of KEY_ABILITY) {
    let p = {label: `${abilityName(i)}`, type: "number", value: `${params[i][0]}`};
    AppCore.character.pawnData.params.push(p);
  }
}
// ユドナリウム系の絆・エゴデータの取得（ユドナイトのメモ欄を使用する場合を除く）
function udonariumPawnBindsData(data) {
  // 絆・エゴデータを読み込む
  for(let i of sortBindsData(data)) {
    if(!i || !i.type) { continue; }
    let bind = {
      label: "絆・エゴ", type: "note", max: 0,
      value: `【${i.type}】` + (i.name ? `${i.name}` : "") + (i.relation ? `（関係：${i.relation}）` : "")
    };
    AppCore.character.pawnData.memoBinds.push(bind);
  }
}
// ユドナリウムリリィのバフパレット自動処理
function autoInsertLilyBuffPalette() {
  if(!AppCore.settings.specialized["ユドナリウムリリィ"].buffPalette) { return; }
  for(let i of AppCore.notes.optionsBuffPalette) {
    if(i === "新規") { continue; }
    AppCore.addLilyBuffPalette(i);
  }
}
// ユドナイトの消耗リソース管理抽出
function filterUdoniteLimitResourcesControl(data) {
  // データの初期化
  AppCore.character.pawnData.limitResources = [
    {label: "使い捨てアイテム", values: []},
    {label: "ラウンド制限", values: []},
    {label: "シーン制限", values: []},
    {label: "シナリオ制限", values: []}
  ];
  // データをチェック
  const disposable = filterUdoniteLimitResourceDisposable(data);
  if(disposable.length > 0) {
    AppCore.character.pawnData.limitResources[0].values.splice(0, 0, ...disposable);
  }
  const round = filterUdoniteLimitResourceCount(data, "round");
  if(round.length > 0) {
    AppCore.character.pawnData.limitResources[1].values.splice(0, 0, ...round);
  }
  const scene = filterUdoniteLimitResourceCount(data, "scene");
  if(scene.length > 0) {
    AppCore.character.pawnData.limitResources[2].values.splice(0, 0, ...scene);
  }
  const scenario = filterUdoniteLimitResourceCount(data, "scenario");
  if(scenario.length > 0) {
    AppCore.character.pawnData.limitResources[3].values.splice(0, 0, ...scenario);
  }
  // console.log(AppCore.character.pawnData.limitResources);
}
// ユドナイト消耗リソース抽出「種別：使い捨て」
function filterUdoniteLimitResourceDisposable(data) {
  const targetItems = data.items.map(item => {
    if(!item) { return; }
    let result = void 0;
    if((item.type && item.type.match(/捨/)) || (item.notes && item.notes.match(/使い捨て/))) {
      // 正規表現テスト
      const matchData = item.name.replace(/\s/g, "").match(/([^x×\*]+)(?:[x×\*](\d+))?/);
      if(matchData) {
        result = {
          name: addAptBracketsToObjectName({name: matchData[1]}, {blooming: false, ruby: false}),
          value: matchData[2] ? parseInt(matchData[2], 10) : 1,
          max: 0
        };
      }
    }
    return result;
  }).filter(item => item);
  // 重複した名前のものは合算してお返しする
  let checker = [];
  const result = [];
  // console.table(targetItems);
  for(let i of targetItems) {
    // console.log(i);
    if(checker.includes(i.name)) {
      // 重複アイテムを弾く
      let item = result.find(item => item.name === i.name);
      item.value += i.value;
    } else {
      // 通常の処理
      checker.push(i.name);
      result.push(i);
    }
  }
  // console.table(result);
  return result;
}
// ユドナイト消耗リソース抽出「ラウンド／シーン／シナリオ●回」
function filterUdoniteLimitResourceCount(data, type="round") {
  // 内部で関数を定義
  const EM_to_em = str => str.replace(/[Ａ-Ｚａ-ｚ０-９＋－（）［］]/g, function(s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); });
  // アイテムの一覧を作成
  const objects = [].concat(data.arts, data.items, data.weapons);
  // 正規表現の一覧を作成
  const regexpCount = {
    round: /(?:ラウンド(\d+|LV|(?:[\[\(])LV\+\d+(?:[\)\]]))回|R(\d+|LV|(?:[\[\(])LV\+\d+(?:[\)\]]))回|(\d+|LV|(?:[\[\(])LV\+\d+(?:[\)\]]))\/R)/,
    scene: /(?:シーン(\d+|LV|(?:[\[\(])LV\+\d+(?:[\)\]]))回|Sn(\d+|LV|(?:[\[\(])LV\+\d+(?:[\)\]]))回|(\d+|LV|(?:[\[\(])LV\+\d+(?:[\)\]]))\/Sn)/,
    scenario: /(?:シナリオ(\d+|LV|(?:[\[\(])LV\+\d+(?:[\)\]]))回|Sr(\d+|LV|(?:[\[\(])LV\+\d+(?:[\)\]]))回|(\d+|LV|(?:[\[\(])LV\+\d+(?:[\)\]]))\/Sr)/
  };
  // チェック開始
  const targetObjects = objects.map(obj =>{
    if(!obj) { return; }
    if(!obj.notes) { return; }
    let result = void 0;
    const matchData = EM_to_em(obj.notes).match(regexpCount[type]);
    if(matchData) {
      let check = [...matchData.filter(i => i)].pop().replace(/[\[\]\(\)]/g, "");
      if(check.match(/^LV/)) {
        if(!("level" in obj)) { return; }
        check = check.replace("LV", `${parseInt(obj.level, 10)}`);
      }
      const count = evalCalculation(check);
      result = {
        name: addAptBracketsToObjectName(obj, {blooming: false, ruby: false}),
        value: count,
        max: count
      };
      if(obj.name === "幸不幸の等価交換" && type === "scenario") { result.value = 0; }
    }
    return result;
  }).filter(obj => obj);
  // console.table(targetObjects);
  return targetObjects;
}
// ユドナリウム系の駒画像データの処理
function udonariumProcessPawnImage(data) {
  let hashImage, b64Image;
  if(data.images) {
    b64Image = data.images.uploadImage.replace(/^.*,/, "");
    let shaObj = new jsSHA("SHA-256", "B64");
    shaObj.update(b64Image);
    hashImage = shaObj.getHash("HEX");
  }
  return {hashImage: hashImage, imagesrc: b64Image};
}

// ユドナリウム系ツールの駒作成
function createZipForUdonariumPawn() {
  // データを確定
  const pawnData = JSON.parse(JSON.stringify(AppCore.character.pawnData));
  const tool = AppCore.character.lastTool;
  // ベースになるテキストの準備
  let xml = "";
  // 内部関数：typeの取得
  const convertType = (obj) => {
    switch(obj.type) {
      case "normal":
        return "";
      case "numberResource":
        return 'type="numberResource"';
      case "note":
        return 'type="note"';
      case "number":
        if(["Udonarium with Fly", "ユドナイト"].includes(tool)) {
          return ' type="simpleNumber"';
        } else {
          return "";
        }
    }
  };
  // 内部関数：文字実体参照への変換
  const entity = str => changeStringToEntityReferences(str);
  // キャラクター駒のヘッダ部分作成
  let characterHeaderArray = [
    'character',
    'location.name="table"',
    'location.x="300"',
    'location.y="300"',
    'posZ="0"',
    'rotate="0"',
    'roll="0"'
  ];
  if(tool === "ユドナリウムリリィ") {
    // ユドナリリィのキャラクター駒発言色はここに埋め込み
    characterHeaderArray = characterHeaderArray.concat([
      `chatColorCode.0="${pawnData.colorCodes[0]}"`,
      `chatColorCode.1="${pawnData.colorCodes[1]}"`,
      `chatColorCode.2="${pawnData.colorCodes[2]}"`,
      'syncDummyCounter="0"'
    ]);
  }
  // ヘッダとフッタを作成
  let characterHeader = `<${characterHeaderArray.join(" ")}>`;
  let characterFooter = "</character>";
  // 1. キャラクター定義の開始
  xml += '<data name="character">';
  // 2. 画像データの処理
  const imageProcessed = udonariumProcessPawnImage(AppCore.character.mainData);
  let xmlImage = [
    '<data type="image" name="imageIdentifier">',
    imageProcessed.hashImage ? imageProcessed.hashImage : 'none_icon',
    '</data>'
  ];
  // 画像処理
  if(xmlImage) {
    xml += '<data name="image">' + xmlImage.join("") + '</data>';
  }
  // 3. キャラクター基本情報
  let xmlCommon = [
    `<data name="name">${entity(pawnData.name)}</data>`,
    `<data name="size">${entity(pawnData.size.toString())}</data>`
  ];
  // withFlyとユドナイトは、キャラクターシートURLを駒に登録する
  if(["Udonarium with Fly", "ユドナイト"].includes(tool)) {
    xmlCommon.push(`<data type="url" name="参照URL">${entity(AppCore.character.mainDataUrl)}</data>`);
  }
  // 基本情報 拾う処理
  if(xmlCommon) {
    xml += '<data name="common">' + xmlCommon.join("") + '</data>';
  }
  // 4. キャラクター詳細情報
  let xmlDetail = { status: [], params: [], binds: [] };
  // status 拾う処理
  if(pawnData.status) {
    xmlDetail.status = pawnData.status.map(obj => {
      let s;
      switch(obj.type) {
        case "numberResource":
          s = `<data ${convertType(obj)} currentValue="${obj.value}" name="${entity(obj.label)}">${entity(obj.max.toString())}</data>`;
          break;
        case "note":
          s = `<data ${convertType(obj)} name="${entity(obj.label)}">${entity(obj.value.toString())}</data>`;
          break;
        default:
          s = `<data name="${entity(obj.label)}"${convertType(obj)}>${entity(obj.value.toString())}</data>`
          break;
      }
      return s;
    });
  }
  // params 拾う処理
  if(pawnData.params) {
    xmlDetail.params = pawnData.params.map(obj => `<data name="${entity(obj.label)}"${convertType(obj)}>${entity(obj.value.toString())}</data>`);
  }
  // binds  拾う処理
  if(pawnData.memoBinds) {
    xmlDetail.binds = pawnData.memoBinds.map(obj => `<data type="note" name="${entity(obj.label)}">${entity(obj.value.toString())}</data>`);
  }
  console.log("xmlBinds", xmlDetail.binds);
  let xmlStatus = xmlDetail.status ? ('<data name="基本情報">' + xmlDetail.status.join("") + '</data>') : "";
  let xmlParams = xmlDetail.params ? ('<data name="【能力値】">' + xmlDetail.params.join("") + '</data>') : "";
  let xmlBinds = xmlDetail.binds.length > 0 ? ('<data name="絆・エゴの情報">' + xmlDetail.binds.join("") + '</data>') : "";
  xml += '<data name="detail">' + xmlStatus + xmlParams + xmlBinds + '</data>';
  // 5. キャラクター定義の終了
  xml += '</data>';
  // 6. チャットパレットデータの作成
  let paletteHeaderArray = [
    'chat-palette',
    'dicebot="BeastBindTrinity"'
  ];
  if(["Udonarium with Fly", "ユドナイト"].includes(tool)) {
    // withFlyとユドナイトの発言色データはここに埋め込み
    let paletteColor = pawnData.color === "#FFFFFF" ? "" : pawnData.color;
    paletteHeaderArray.push(`paletteColor="${paletteColor}"`);
  }
  xml += [
    `<${paletteHeaderArray.join(" ")}>`,
    changeStringToEntityReferences(AppCore.character.palette),
    '</chat-palette>'
  ].join("");
  // 7. ユドナリリィのバフパレットデータの作成
  if(tool === "ユドナリウムリリィ") {
    let bp = pawnData.buffPalette.map(i => {
      return `${i.name} ${i.effect}${i.round ? " 0" : ""}`;
    });
    xml += '<buff-palette dicebot="BeastBindTrinity">' + changeStringToEntityReferences(bp.join("\n")) + '</buff-palette>';
  }
  // 8. ユドナイトの関連設定
  if(tool === "ユドナイト") {
    // インナーメモ
    if(pawnData.memo) {
      xml += '<data type="note" value="" name="inner-note">' + entity(pawnData.memo) + '</data>';
    }
    // 消耗リソース管理
    if(pawnData.limitResources) {
      let disposable = [];
      if(pawnData.limitResources[0].values.length > 0) {
        for(let i of pawnData.limitResources[0].values) { disposable.push(`<data type="simpleNumber" name="${entity(i.name)}" currentValue="1">${i.value}</data>`); }
      }
      let round = [];
      if(pawnData.limitResources[1].values.length > 0) {
        for(let i of pawnData.limitResources[1].values) { round.push(`<data type="numberResource" name="${entity(i.name)}" currentValue="${i.value}">${i.max}</data>`); }
      }
      let scene = [];
      if(pawnData.limitResources[2].values.length > 0) {
        for(let i of pawnData.limitResources[2].values) { scene.push(`<data type="numberResource" name="${entity(i.name)}" currentValue="${i.value}">${i.max}</data>`); }
      }
      let scenario = [];
      if(pawnData.limitResources[3].values.length > 0) {
        for(let i of pawnData.limitResources[3].values) { scenario.push(`<data type="numberResource" name="${entity(i.name)}" currentValue="${i.value}">${i.max}</data>`); }
      }
      xml += '<limit-resource parentCharacter="">'
             + '<data name="common"></data>'
             + (disposable.length > 0 ? `<data name="使い捨てアイテム">${disposable.join("")}</data>` : "")
             + (round.length > 0 ? `<data name="ラウンド制限">${round.join("")}</data>` : "")
             + (scene.length > 0 ? `<data name="シーン制限">${scene.join("")}</data>` : "")
             + (scenario.length > 0 ? `<data name="シナリオ制限">${scenario.join("")}</data>` : "")
             + '</limit-resource>';
    }
    // イニシアティブ修正値
    xml += `<data name="initiative">${pawnData.initiativeMod}</data>`;
  }
  // 駒の定義終了
  xml = '<?xml version="1.0" encoding="UTF-8"?>' + characterHeader + xml + characterFooter;
  // 中身をチェック
  // console.log(xml);

  // xmlファイルの作成
  let blobXML = new Blob([xml], {type: "text/xml"});
  // zipファイルの作成
  let zip = new JSZip();
  zip.file(`${pawnData.name}.xml`, blobXML);
  if(imageProcessed.hashImage) {
    zip.file(`${imageProcessed.hashImage}.png`, imageProcessed.imagesrc, {base64: true});
  }
  // データのダウンロード
  zip.generateAsync({type: "blob"}).then(function(content) {
    saveAs(content, `${pawnData.name}.zip`);
  });
}
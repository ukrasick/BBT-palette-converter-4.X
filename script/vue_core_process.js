const AppCoreProcess = Vue.createApp({
  data() {
    return {
      // settings: localStorageに保存するデータ群
      settings: {
        // 基本設定
        general: {
          sessionTool: "なし",
          outputFalldownRoll: true, // 堕落判定の判定文を作成するか確認
          RollSortType: "《魔獣化》の有無", // 判定文の並べ替え基準（《魔獣化》の有無 or【能力値】ごと）
          outputCalculatedRoll: true, // 判定文の修正値を計算した状態で出力するか
          autoCheckFumbleValue: false,  // ファンブル値修正アーツの取得の有無を自動チェックするか
          autoSave: false // 設定の自動保存を行うかどうかを設定
        },
        // アーツ・アイテム関連
        arts: {
          // 出力順序
          // timing: タイミング, name: 名称, cost: コスト, target: 対象, range: 射程, target&range: 対象・射程統合表記, notes: 備考, other: その他の装飾用
          // %text%は、other以外の項目において、アーツ・アイテムデータの当該データに置換される
          outputOrders: [
            { type: "timing", text: "%text% - ", output: true },
            { type: "name", text: "%text%", output: true },
            { type: "cost", text: "（%text%）", output: true },
            { type: "target&range", text: "【%text%】", output: false },
            { type: "notes", text: "：%text%", output: true }
          ],
          exceptTimingEmpty: false, // タイミング空欄は出力しない
          exceptTimingAuto: false, // タイミング常時は出力しない
          exceptSelfEffect: true, // 「対象：自身」は上記の出力表で対象関連の表示を省略する
          outputJudgeText: "重複は省略",  // 「判定値」欄の能力値情報を反映する方法
          displayLevel: "『LV1』のみ省略" // アーツLVの表示における省略設定
        },
        // ダメージロール関連
        damageRolls: {
          includeNotes: true, // ダメージロール式の際に、武器の備考欄をともに引用する
          includeSpAttack: true,  // アーツ備考欄の[ ]内で区切られたデータを特殊攻撃扱いとして抜き出す
          outputJudgeText: "重複は省略",  // 武器攻撃の判定式作成における、「判定値」欄の扱い
          judgeHeadNumber: "基準値として扱う" // 武器攻撃の判定式作成における、「命中」欄の扱い
        },
        // 駒データ出力に関する共通オプション
        outputPawn: {
          initializeParams: false, // 駒に紐づけるデータを毎回初期化するかの設定
          initiative: true, // イニシアティブ用のパラメータを作成するかの設定（ユドナリウムのみ）
          initiativeName: "Init" // イニシアティブ用パラメータの名称
        },
        // 各ツール専用のオプション
        specialized: {
          "ユドナリウム（ルビのみ）": {
            autoRuby: true
          },
          "ユドナリウムリリィ": {
            autoRuby: false,
            buffPalette: true,
            outputCostAsUsual: false,
            bindsOutputAsMarkDown: false
          },
          "Udonarium with Fly": {
            autoRuby: false,
            declareWithBlooming: false,
            addExclamationWithDeclaration: true,
            removeBracketWithDeclaration: false
          },
          "ユドナイト": {
            autoRuby: false,
            declareWithBlooming: false,
            addExclamationWithDeclaration: true,
            removeBracketWithDeclaration: false,
            autoCheckConsumingResources: true,
            bindsOutputAsInnerNotes: true
          },
          "Tekey": {
            autoRuby: false,
            applyPullDown: ["シーン登場時の処理", "一般的な判定", "一般的な行動", "アーツ一覧", "アイテム一覧", "一般的なリアクション", "愛・罪の効果", "ダメージロール一覧", "能力値関連", "リソース操作"]
          },
          "ゆとチャadv.": {
            autoRuby: false,
            applyPullDown: ["シーン登場時の処理", "一般的な判定", "一般的な行動", "アーツ一覧", "アイテム一覧", "一般的なリアクション", "愛・罪の効果", "ダメージロール一覧", "能力値関連", "リソース操作"]
          }
        },
        outputOrders: {
          list: [
            {name: "登場", usable: true, flag: "シーン登場時の処理"},
            {name: "一般的な判定", usable: true, flag: "一般的な判定"},
            {name: "一般的な行動", usable: true, flag: "一般的な行動"},
            {name: "アーツ", usable: true, flag: "アーツ一覧"},
            {name: "アイテム", usable: true, flag: "アイテム一覧"},
            {name: "リアクション", usable: true, flag: "一般的なリアクション"},
            {name: "愛・罪の効果", usable: true, flag: "愛・罪の効果"},
            {name: "ダメージロール", usable: true, flag: "ダメージロール一覧"},
            {name: "能力値一覧", usable: true, flag: "能力値関連"},
            {name: "リソース操作", usable: true, flag: "リソース操作"}
          ]
        },
      },
      // 判定の修正値
      modifiers: {
        scoreList: {
          all: {a:0, h:0, b:0},
          baseAbility: {a:0, h:0, b:0},
          body: {a:0, h:0, b:0},
          skill: {a:0, h:0, b:0},
          emotion: {a:0, h:0, b:0},
          divine: {a:0, h:0, b:0},
          society: {a:0, h:0, b:0},
          battleAbility: {a:0, h:0, b:0},
          combat: {a:0, h:0, b:0},
          shoot: {a:0, h:0, b:0},
          dodge: {a:0, h:0, b:0},
          action: {a:0, h:0, b:0},
          binds: {a:0, h:0, b:0}
        },
        artsFumble: []
      },
      // 作業用の一時保管系データ
      character: {
        sheetUrl: "",
        mainData: {},
        mainDataName: "",
        mainDataUrl: "",
        menuDisplay: false,
        palette: "",
        paletteError: [],
        pawnData: {},
        artsSample: "キャラクターデータ読込後、アーツ表示のサンプルを利用可能です。",
        lastTool: ""
      },
      // サポートツール一覧
      supportedTools: [
        "なし",
        "ココフォリア",
        "ユドナリウム",
        "ユドナリウムリリィ",
        "Udonarium with Fly",
        "ユドナイト",
        "ユドナリウム（ルビのみ）",
        "TRPGスタジオ",
        "Tekey",
        "ゆとチャadv.",
        "Quoridorn"
      ],
      // エディタ用の選択肢データ
      editor: {
        newBuffPalette: "新規"
      },
      // 解説・表示関連の固定データ
      notes: {
        // パレット出力順序の設定
        outputOrders: {
          "登場": "シーン登場時の人間性低下ダイスを出力します。",
          "一般的な判定": "一般的な判定式を出力します。",
          "一般的な行動": "一般的な行動と、武器攻撃の宣言文を出力します。",
          "アーツ": "アーツの使用宣言文を出力します。",
          "アイテム": "アイテムの使用宣言文を出力します。",
          "リアクション": "「ドッジ」と各武器によるガード宣言を出力します。",
          "愛・罪の効果": "愛や罪の効果一覧を出力します。",
          "ダメージロール": "各武器欄からダメージロール式を抽出し、出力します。",
          "能力値一覧": "チャットパレットに【能力値】を埋め込みます。",
          "リソース操作": "リソース操作コマンドの定型文を埋め込みます。"
        },
        outputArtsOrdersName: {
          "name": "名称", "timing": "タイミング", "target": "対象", "range": "射程", "target&range": "対象＆射程",
          "cost": "コスト", "notes": "効果・備考", "other": "その他"
        },
        outputArtsOrdersOption: [
          "name", "timing", "target", "range", "target&range", "cost", "notes", "other"
        ],
        outputArtsOrdersSampleObject: {
          "name": "魔獣化", "timing": "マイナー", "target": "自身", "range": "なし", "judge": "自動成功", "cost": "1", "notes": "魔獣の姿になる。データ変更", "level": "1"
        },
        // ファンブル値操作アーツの対象となるもの
        fumbleArtsList: [
          "ダメ魔物", "しまった、こんな時に！", "偉大なる血脈", "この世ならざるもの", "不思議科学", "身体改造処置", "精神強化処置", "不安定なる高性能", "契約代償：不運", "秘されし真名", "どうして自分だけ！？"
        ],
        // ファンブル値操作アーツの解説
        fumbleArtsDescription: {
          "ダメ魔物": "《魔獣化》中のファンブル値+2",
          "しまった、こんな時に！": "特定状況下でファンブル時に達成値が0にならない",
          "偉大なる血脈": "常にファンブル値+1",
          "この世ならざるもの": "ファンブル時に達成値が0にならない",
          "不思議科学": "常にファンブル値+1",
          "身体改造処置": "【基本能力値】判定のファンブル値+1",
          "精神強化処置": "【戦闘能力値】判定のファンブル値+1",
          "不安定なる高性能": "《魔獣化》中のファンブル値+1（暫定）",
          "契約代償：不運": "常にファンブル値+2",
          "秘されし真名": "《魔獣化》中のファンブル値+1",
          "どうして自分だけ！？": "クリティカルしない（クリティカル値を「13」として式作成）"
        },
        // 【能力値】判定の順序
        optionsSortType: ["【能力値】ごと", "《魔獣化》の有無"],
        // 判定文の重複排除などのオプション
        optionsJudgeType: ["すべて追加", "重複は省略", "追加しない"],
        // 武器攻撃の「命中」欄の扱いの選択肢
        optionsJudgeHead: ["基準値として扱う", "プラスの修正として扱う"],
        // アーツのレベル表示に関する選択肢
        optionsDisplayArtsLevel: ["すべて表示", "『LV1』のみ省略", "すべて省略"],
        // ユドナリウムリリィ用バフパレットのBS一覧
        optionsBuffPalette: [
          "新規", "邪毒", "重圧", "狼狽", "放心", "束縛", "暴走", "翻弄", "恐怖", "迫害"
        ],
        // ココフォリア等の駒におけるカラーパレットのプリセット
        optionsColorPresets: ["#222222", "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#607D8B", "#9E9E9E", "#E0E0E0"],
        // ユドナリウムリリィのカラーピッカー用ラジオボタン
        lilyColorPick: "0"
      },
      // ユドナリウム系：キャラクター駒作成の表示項目制御
      udonariumPawnGeneratorOptions: {},
      toast: {el: null}
    }
  },
  mounted: function() {
    // localStorageからのデータ読み込み
    try {
      // ローカルストレージ変数にデータが保存されているかをチェック
      const SavedOptions = localStorage.getItem("PC4x-options");
      // objectかどうかの判別
      const checkObject = (obj) => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
      // ネストされたオブジェクトがあるかを確認する変数
      const checkNestedObject = (obj) => {
        // console.log(Object.keys(obj));
        for(let i of Object.keys(obj)) {
          // console.log("options", `${i}`, obj[i], checkObject(obj[i]));
          if(checkObject(obj[i]) === "object") { return true; }
        }
        return false;
      };
      // ローカルストレージ変数からデータを復元
      if(SavedOptions) {
        let options = JSON.parse(SavedOptions);
        // console.log("SavedOptions", options);
        for(let i of Object.keys(this.settings)) {
          if(checkNestedObject(this.settings[i])) {
            // ネストされたオブジェクトがある場合はそれぞれにObject.assignする
            for(let j of Object.keys(this.settings[i])) {
              Object.assign(this.settings[i][j], options[i][j]);
            }
          } else {
            // ネストされたオブジェクトがない場合、そのままObject.assignする
            Object.assign(this.settings[i], options[i]);
          }
        }
        // console.log("Assigned Options", this.settings);
      }
    } catch(error) {
      console.log(error);
    }
    // Bootstrap/toastの初期化
    this.toastInit();
  },
  methods: {
    toastInit() {
      var toastElList = [].slice.call(document.querySelectorAll(".toast"));
      this.toast.el = toastElList.map(function(toastEl) {
        return new bootstrap.Toast(toastEl, {delay: 2000,});
      });
    },
    showToast() {
      this.toast.el[0].show();
    },
    // キャラクターシート倉庫のURLからデータを読み込む
    processStart() {
      if(!this.character.sheetUrl.match(/character-sheets.appspot.com\/bbt\/edit.html\?key=/)) {
        alert("キャラクターシートのURLを入力してください。（URL短縮サービスでのURLは使用できません。）");
        return;
      }
      // キャッシュがあるかを確認し、同じ場合はキャッシュからデータを読み込む
      console.log("保存データのチェック", this.character.sheetUrl === this.character.mainDataUrl);
      if(this.character.mainData && this.character.mainDataUrl === this.character.sheetUrl) {
        // キャッシュデータからコールバック関数を起動
        convert(this.character.mainData, true);
        return;
      }
      // 保存データがない場合、JSONPでデータを取得して保持する
      console.log("キャラクターシート倉庫からデータを読み込み");
      this.character.mainDataUrl = JSON.parse(JSON.stringify(this.character.sheetUrl));
      let key = (location.protocol === "https:" ? "https:" : "http:") + "//character-sheets.appspot.com/bbt/display?ajax=1&key=" + this.character.sheetUrl.split(/key=/)[1] + "&base64Image=1";
      const jsc = document.createElement("script");
      jsc.src = key + "&callback=convert";
      document.body.appendChild(jsc);
      document.body.removeChild(document.body.lastChild);
    },
    // オプションデータの保存
    save_options(manual = false) {
      const saveData = JSON.stringify(this.settings);
      localStorage.setItem("PC4x-options", saveData);
      if(manual) {
        alert("出力オプションをローカルストレージに保存しました。");
      }
    },
    // オプションデータの削除
    reset_options() {
      const check = confirm("保存している出力オプションを削除します。よろしいですか？");
      if(check) {
        localStorage.removeItem("PC4x-options");
        alert("保存されていた出力オプションを削除しました。ページの再読み込み後、初期化されます。");
      }
    },
    // 入力URLの変化があった時、データのリセットを行う
    revokeMainData() {
      if(!this.character.mainDataUrl) { return; }
      if(this.character.mainDataUrl !== this.character.sheetUrl) {
        this.initializeCharacterSheetData();
      }
    },
    // 取得したキャラクターデータの初期化
    initializeCharacterSheetData(manual = false) {
      this.character = {
        sheetUrl: "",
        mainData: {},
        mainDataName: "",
        mainDataUrl: "",
        menuDisplay: false,
        palette: "",
        paletteError: [],
        pawnData: {},
        artsSample: "キャラクターデータ読込後、アーツ表示のサンプルを利用可能です。",
        lastTool: ""
      };
      this.initializeModifiersList();

      // 手動リセットした時は、コンテンツをトップまでスクロールしなおす
      if(manual) {
        scrollByToById("pc4x_core");
      }
    },
    // 出力順番の初期化
    initializeOutputOrders() {
      this.settings.outputOrders.list = [
        {name: "登場", usable: true, flag: "シーン登場時の処理"},
        {name: "一般的な判定", usable: true, flag: "一般的な判定"},
        {name: "一般的な行動", usable: true, flag: "一般的な行動"},
        {name: "アーツ", usable: true, flag: "アーツ一覧"},
        {name: "アイテム", usable: true, flag: "アイテム一覧"},
        {name: "リアクション", usable: true, flag: "一般的なリアクション"},
        {name: "愛・罪の効果", usable: true, flag: "愛・罪の効果"},
        {name: "ダメージロール", usable: true, flag: "ダメージロール一覧"},
        {name: "能力値一覧", usable: true, flag: "能力値関連"},
        {name: "リソース操作", usable: true, flag: "リソース操作"}
      ];
    },
    // アーツ出力テキストの順番の初期化
    initializeArtsOutputOrders() {
      this.settings.arts.outputOrders = [
        { type: "timing", text: "%text% - ", output: true },
        { type: "name", text: "%text%", output: true },
        { type: "cost", text: "（%text%）", output: true },
        { type: "target&range", text: "【%text%】", output: false },
        { type: "notes", text: "：%text%", output: true }
      ];
    },
    // アーツ出力テキストの行追加
    addArtsOutputOrders() {
      this.settings.arts.outputOrders.push({type: "other", text: "", output: true});
    },
    // アーツ出力のサンプル
    outputArtsSample() {
      if(Object.keys(this.character.mainData).length === 0) {
        alert("サンプル確認はキャラクターシートのデータを用いて行うため、先にキャラクターシートのデータを読み込んでください。");
        return;
      }
      const sample = this.notes.outputArtsOrdersSampleObject;
      let result = this.settings.arts.outputOrders.map(element => makeActionElementText(element, sample));
      this.character.artsSample = result.join("");
    },
    // 判定修正値データの初期化
    initializeModifiersList() {
      this.modifiers.scoreList = {
        all: {a:0, h:0, b:0},
        baseAbility: {a:0, h:0, b:0},
        body: {a:0, h:0, b:0},
        skill: {a:0, h:0, b:0},
        emotion: {a:0, h:0, b:0},
        divine: {a:0, h:0, b:0},
        society: {a:0, h:0, b:0},
        battleAbility: {a:0, h:0, b:0},
        combat: {a:0, h:0, b:0},
        shoot: {a:0, h:0, b:0},
        dodge: {a:0, h:0, b:0},
        action: {a:0, h:0, b:0},
        binds: {a:0, h:0, b:0}
      };
    },
    // 駒データのリセット
    initializePawnData() {
      this.character.pawnData = {};
    },
    // プルダウンリスト全データのチェック
    initializePullDownCheck() {
      const tool = this.settings.general.sessionTool;
      this.settings.specialized[tool].applyPullDown = ["シーン登場時の処理", "一般的な判定", "一般的な行動", "アーツ一覧", "アイテム一覧", "一般的なリアクション", "愛・罪の効果", "ダメージロール一覧", "能力値関連", "リソース操作"];
    },
    // ユドナリウム駒データの初期化
    initializeUdonariumPawn() {
      this.character.pawnData = {
        name: this.character.mainDataName,
        size: 1,
        status: [],
        params: [],
        memoBinds: [],
        image: ""
      };
      Object.assign(
        this.character.pawnData,
        this.initializeUdonariumLineageIndividualSettings(this.character.lastTool)
      );
      // さらに個別の初期設定
      if(this.character.lastTool === "ユドナイト") {
        this.character.pawnData.limitResources = [
          {label: "使い捨てアイテム", values: []},
          {label: "ラウンド制限", values: []},
          {label: "シーン制限", values: []},
          {label: "シナリオ制限", values: []}
        ];
        this.character.pawnData.memo = "";
      }
      if(this.character.lastTool === "ユドナリウムリリィ") {
        if(this.settings.specialized["ユドナリウムリリィ"].bindsOutputAsMarkDown) {
          this.character.pawnData.memo = "";
        }
      }
    },
    // ユドナリウム系のツールごとに異なる初期設定の作成
    initializeUdonariumLineageIndividualSettings(tool) {
      let setting = {};
      switch(tool) {
        case "ユドナリウムリリィ":
          setting.buffPalette = [];
          setting.colorCodes = ["#000000", "#FF0000", "#0099FF"];
          break;
        case "Udonarium with Fly":
          setting.color = "#FFFFFF";
          break;
        case "ユドナイト":
          setting.color = "#FFFFFF";
          setting.initiativeMod = 0;
          break;
      }
      return setting;
    },
    // ココフォリア駒データの初期化
    initializeCcfoliaPawn() {
      this.character.pawnData = {
        name: this.character.mainDataName, memo: "", status: [], params: [], size: 4,
        active: true, secret: false, invisible: false, hideStatus: false,
        color: "#9E9E9E", completedText: ""
      };
    },
    // 駒の基本情報セットの初期化
    initializePawnBasicSettings() {
      let initializeData = {};
      if(this.settings.general.sessionTool === "ココフォリア") {
        initializeData = {
          name: this.character.mainDataName, size: 4,
          active: true, secret: false, invisible: false, hideStatus: false,
          color: "#9E9E9E"
        };
      }
      if(isUdonariumLineage(this.settings.general.sessionTool)) {
        initializeData = {
          name: this.character.mainDataName, size: 1
        };
        if(this.settings.general.sessionTool === "Udonarium with Fly") {
          initializeData.color = "#FFFFFF";
        };
        if(this.settings.general.sessionTool === "ユドナイト") {
          initializeData.color = "#FFFFFF";
          initializeData.initiativeMod = 0;
        };
        if(this.settings.general.sessionTool === "ユドナリウムリリィ") {
          initializeData.colorCodes = ["#000000", "#FF0000", "#0099FF"];
        }
      }
      Object.assign(this.character.pawnData, initializeData);
    },
    // ココフォリア用駒データの出力
    outputCcfoliaPawnText() {
      this.character.pawnData.completedText = createTextForCcfoliaPawn(this.character.mainData);
    },
    // ココフォリアのステータス・パラメータ新規データの追加
    addNewElementForCcfolia(type) {
      if(Object.keys(this.character.pawnData).length === 0) { return; }
      switch(type) {
        case "status":
          this.character.pawnData.status.push({label: "", value: 0, max: 0});
          break;
        case "params":
          this.character.pawnData.params.push({label: "", value: ""});
          break;
      }
    },
    // ココフォリアのステータス・パラメータ初期化
    resetCcfoliaPawnStatus() {
      const check = confirm("ステータスを初期化します。よろしいですか？");
      if(!check) { return; }
      this.character.pawnData.status = [];
      ccfoliaPawnStatus(this.character.mainData);
    },
    resetCcfoliaPawnParams() {
      const check = confirm("パラメータを初期化します。よろしいですか？");
      if(!check) { return; }
      this.character.pawnData.params = [];
      ccfoliaPawnParams(this.character.mainData);
    },
    // ココフォリア・ユドナイトのメモ欄引用機能
    quoteCharacterMemo(mode) {
      let text = pawnQuoteMemo(mode);
      if(text) {
        if(this.character.pawnData.memo) {
          this.character.pawnData.memo = [this.character.pawnData.memo, text].join("\n");
        } else {
          this.character.pawnData.memo = text;
        }
      }
    },
    // ユドナリウムのパラメータ種別が変わった時の処理
    udonariumParamsTypeChanged(obj) {
      switch(obj.type) {
        case "numberResource":
          if(isNaN(parseInt(obj.value, 10))) {
            obj.value = "0";
            obj.max = 0;
          } else {
            obj.max = parseInt(obj.value, 10);
          }
          break;
        default:
          obj.max = 0;
          break;
      }
    },
    // ユドナリウムのステータス・パラメータ新規データの追加
    addNewElementForUdonarium(type) {
      if(Object.keys(this.character.pawnData).length === 0) { return; }
      switch(type) {
        case "status":
          this.character.pawnData.status.push({label: "", type: "number", value: 0, max: 0});
          break;
        case "params":
          this.character.pawnData.params.push({label: "", type: "number", value: 0});
          break;
        case "binds":
          this.character.pawnData.memoBinds.push({label: "絆・エゴ", type: "note", value: ""});
          break;
      }
    },
    // ユドナリウムのステータス・パラメータ初期化
    resetUdonariumPawnStatus() {
      const check = confirm("ステータスを初期化します。よろしいですか？");
      if(!check) { return; }
      this.character.pawnData.status = [];
      udonariumPawnStatus(this.character.mainData);
    },
    resetUdonariumPawnParams() {
      const check = confirm("パラメータを初期化します。よろしいですか？");
      if(!check) { return; }
      this.character.pawnData.params = [];
      udonariumPawnParams(this.character.mainData);
    },
    // 絆・エゴ情報のリセット
    resetUdonariumPawnBinds() {
      const check = confirm("絆・エゴの情報を初期化します。よろしいですか？");
      if(!check) { return; }
      this.character.pawnData.memoBinds = [];
      udonariumPawnBindsData(this.character.mainData);
    },
    // ユドナリウムリリィのバフパレット要素の追加とリセット
    addLilyBuffPalette(bs=false) {
      if(!("buffPalette" in this.character.pawnData)) { return; }
      let palette = {name: "", effect: "", round: false};
      if(!bs) { bs = this.editor.newBuffPalette; }
      switch(bs) {
        case "邪毒":
          Object.assign(palette, {name: "邪毒X", effect: "クリンナップにXD6点ダメージ"});
          break;
        case "重圧":
          Object.assign(palette, {name: "重圧", effect: "アーツ使用不可"});
          break;
        case "狼狽":
          Object.assign(palette, {name: "狼狽", effect: "達成値-5、移動不可"});
          break;
        case "放心":
          Object.assign(palette, {name: "放心", effect: "達成値-5", round: true});
          break;
        case "束縛":
          Object.assign(palette, {name: "束縛", effect: "移動・ドッジ不可"});
          break;
        case "暴走":
          Object.assign(palette, {name: "暴走", effect: "ガード・カバーリング不可"});
          break;
        case "翻弄":
          Object.assign(palette, {name: "翻弄", effect: "対象を含まない判定-3"});
          break;
        case "恐怖":
          Object.assign(palette, {name: "恐怖", effect: "対象を含む判定-3"});
          break;
        case "迫害":
          Object.assign(palette, {name: "迫害状態", effect: "登場時の人間性ダイス増加"});
          break;
        default:
          break;
      }
      this.character.pawnData.buffPalette.push(palette);
    },
    // ユドナリリィのバフパレット機能リセット
    resetLilyBuffPalette() {
      if(!("buffPalette" in this.character.pawnData)) { return; }
      const check = confirm("バフパレットのデータを初期化します。よろしいですか？");
      if(!check) { return; }
      this.character.pawnData.buffPalette = [];
      autoInsertLilyBuffPalette();
    },
    // ユドナイトの消耗リソース管理機能のリセット
    resetUdoniteLimitResource() {
      if(!("limitResources" in this.character.pawnData)) { return; }
      const check = confirm("消耗リソース管理のデータを初期化します。よろしいですか？");
      if(!check) { return; }
      filterUdoniteLimitResourcesControl(this.character.mainData);
    },
    // ユドナリウムキャラクター駒作成の発火
    igniteCreateZipForUdonariumPawn() {
      createZipForUdonariumPawn();
    },
    // 発言色のパネル反映
    applyColor(event, value) {
      if(event) {
        switch(this.character.lastTool) {
          case "ユドナリウムリリィ":
            const index = parseInt(this.notes.lilyColorPick, 10);
            this.character.pawnData.colorCodes[index] = value;
            return;
          default:
            this.character.pawnData.color = value;
            return;
        }
      }
    },
    // ボタンクリックによるテーブル系データの順番入れ替え
    spliceTableDataElement(event, array, mode="delete") {
      if(event) {
        // データ情報の取得
        const targetTag = event.target.tagName;
        let parentData = event.target.parentNode.parentNode;
        if(targetTag !== "BUTTON") {
          // ボタン内部の絵文字部分をクリックしていた場合は、さらにひとつ遡る
          parentData = parentData.parentNode;
        }
        let table = [].slice.call(parentData.parentNode.getElementsByTagName("tr"));
        let i = table.indexOf(parentData);
        // table.indexOf(parentData)が-1の場合、マッチしていない
        // たぶん解消はしたけど、念のためこのコードは残す
        if(i === -1) {
          console.log("error: indexOf -1", parentData, table);
          return;
        }
        // データをコピーする
        let data = JSON.parse(JSON.stringify(array[i]));
        // 処理を行なわないパターンを確認し、弾く
        if(mode === "up" && i === 0) { return; }
        if(mode === "down" && i === table.length - 1) { return; }
        // 配列の元のデータを削除
        array.splice(i, 1);
        // 必要な場合、移動先にコピーしたデータを挿入する
        switch(mode) {
          case "up":
            array.splice(i-1, 0, data);
            break;
          case "down":
            array.splice(i+1, 0, data);
            break;
          case "translation-S":
            this.character.pawnData.status.push({label: data.label, value: parseInt(data.value, 10), max: parseInt(data.value, 10)});
            break;
          case "translation-P":
            this.character.pawnData.params.push({label: data.label, value: `${data.value}`});
            break;
        }
      }
    },
    // 各オンセツールの基本出力機能を取得
    systemConfig() {
      let result = {
        prefix: "", // ダイスロール用の式に必要な接頭詞の必要の有無。主にTRPGスタジオ用
        reservedWords: false, // 予約語の機能に対応しているかの設定。非対応ツールでは、最後に【能力値】関連の記載を実数値に置換する
        paramPawn: false, // 駒にステータス・パラメータを紐づけられるツールかの設定。
        paramPalette: false,  // チャットパレットに予約語が記載できるかの設定。
        citeHumanity: false,  // チャットパレット側に%{人間性}の引用機能があるかの設定。
        pawnGenerator: false, // 駒出力機能に対応しているかどうかの設定。
        autoArtsPayment: false, // アーツコストの自動支払いに対応するかの設定。主にユドナリリィ用の機能。
        autoScenePayment: false, // シーン登場時の人間性低下の自動支払いに対応するかの設定。ユドナリリィ、ユドナイト用。
        resourceController: false, // リソース操作コマンドを出力するかどうかの設定。
        attachAbilitiesList: false  // 能力値一覧をチャットパレット側に記載するツールかの設定。
      };
      switch(this.settings.general.sessionTool) {
        case "ココフォリア":
          Object.assign(result, {reservedWords: true, paramPawn: true, citeHumanity: true, pawnGenerator: true, resourceController: true});
          break;
        case "ユドナリウム":
          Object.assign(result, {reservedWords: true, paramPawn: true, paramPalette: true, citeHumanity: true, pawnGenerator: true, attachAbilitiesList: true});
          break;
        case "ユドナリウムリリィ":
          Object.assign(result, {reservedWords: true, paramPawn: true, paramPalette: true, citeHumanity: true, pawnGenerator: true, autoArtsPayment: true, autoScenePayment: true, resourceController: true, attachAbilitiesList: true});
          break;
        case "Udonarium with Fly":
          Object.assign(result, {reservedWords: true, paramPawn: true, paramPalette: true, citeHumanity: true, pawnGenerator: true, attachAbilitiesList: true});
          break;
        case "ユドナイト":
          Object.assign(result, {reservedWords: true, paramPawn: true, paramPalette: true, citeHumanity: true, pawnGenerator: true, autoScenePayment: true, resourceController: true, attachAbilitiesList: true});
          break;
        case "ユドナリウム（ルビのみ）":
          Object.assign(result, {reservedWords: true, paramPawn: true, paramPalette: true, citeHumanity: true, pawnGenerator: true, attachAbilitiesList: true});
          break;
        case "TRPGスタジオ":
          Object.assign(result, {prefix: "/ "});
          break;
        case "Tekey":
          Object.assign(result, {reservedWords: true, paramPalette: true, citeHumanity: true, attachAbilitiesList: true, resourceController: true})
          break;
        case "ゆとチャadv.":
          Object.assign(result, {reservedWords: true, paramPalette: true, attachAbilitiesList: true})
          break;
        case "Quoridorn":
          Object.assign(result, {reservedWords: true, paramPalette: true, citeHumanity: true, attachAbilitiesList: true})
          break;
      }
      return result;
    }
  },
  computed: {
    // キャラクター駒作成ツールをアクティブにしてよいか確認
    activePawnMaker() {
      // チャットパレット未出力の間は対応しない
      if(!this.character.palette) { return false; }
      // 対応しているツールが選択されているなら表示
      return this.systemConfig().pawnGenerator;
    },
    // チャットパレットにエラーがあるかどうかの確認
    paletteHasError() {
      return this.character.palette.indexOf("**Error: 式作成に失敗しました**") > 0 ? true : false;
    },
    // 振りがな対応ツールかの確認
    hasRubyData() {
      return Object.keys(RUBY_TEMPLATE).includes(this.settings.general.sessionTool);
    },
    // 専用のオプションがないツールの確認
    hasSpecializedOptions() {
      const List = Object.keys(this.settings.specialized);
      return List.includes(this.settings.general.sessionTool);
    },
    // ユドナリウム系ツールか？
    isUdonariumLineageTool() {
      return isUdonariumLineage(this.settings.general.sessionTool);
    },
    // ユドナリウム系の絆・エゴ管理を組み込みパラメータで行なうか？
    udonariumManageBindsByParams() {
      if(!isUdonariumLineage(this.settings.general.sessionTool)) {
        return false;
      }
      if(this.settings.general.sessionTool === "ユドナイト" && this.settings.specialized["ユドナイト"].bindsOutputAsInnerNotes) {
        return false;
      }
      return true;
    },
    // 発言色設定の行数指定
    colorColspanByTool() {
      switch(this.character.lastTool) {
        case "ユドナリウムリリィ":
          return 5;
        case "Udonarium with Fly":
          return 3;
        case "ココフォリア":
          return 4;
        case "ユドナイト":
          return 5;
        default:
          return 0;
      }
    },
    // 発言色におけるカラープリセットの選定
    chatColorPresets() {
      if(!this.character.lastTool) { return []; }
      if(['ココフォリア', 'ユドナイト'].includes(this.character.lastTool)) {
        return ["#222222", "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#607D8B", "#9E9E9E", "#E0E0E0"];
      }
      if(['Udonarium with Fly', 'ユドナリウムリリィ'].includes(this.character.lastTool)) {
        return ["#000000", "#FF0000", "#999999", "#990000", "#FF6633", "#669933", "#00CC33", "#009966", "#33CCFF", "#0099FF", "#3366FF", "#003399", "#9933CC", "#663366", "#FF66FF"];
      }
      return [];
    }
  }
});

const AppCore = AppCoreProcess.mount("#pc4x_core");
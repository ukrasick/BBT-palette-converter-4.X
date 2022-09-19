const AppHowToWrite = Vue.createApp({
  data() {
    return {
      arts: [
        {name: "災厄者", type:"攻撃、魔法", level: "1", judge: "感情", tgt: "範囲", range: "シーン", cost: "3", notes: "対象に〈感情〉[感情+(:LV+1)D6]点のダメージを与える特殊攻撃。"},
        {name: "加速装置", type: "なし", level: "1", judge: "技術+2", tgt: "自身", range: "なし", cost: "2", notes: "命中・ドッジの判定を「【技術】+2」で行う。（以下省略）"},
        {name: "アタックアシスト", type:"支援", level: "1", judge: "自動", tgt: "単体", range: "シーン", cost: "2", notes: "対象が与えるダメージに+[4(8)+1D6]。（以下省略）"},
        {name: "シャープストライク", type:"攻撃", level: "3", judge: "白兵+(:LV×2)", tgt: "単体", range: "武器", cost: "2", notes: "白兵攻撃を行う。命中判定の達成値にプラス修正。"},
        {name: "内なる獣：ジョーカードリーム", type:"純血", level: "1", judge: "自動成功", tgt: "単体", range: "シーン", cost: "愛+3", notes: "シナリオ1回まで使用可能"},
        {name: "魔法の呪文：弾幕魔術", type:"攻撃/魔法", level: "1", judge: "感情#+1", notes: "クリティカル値・ファンブル値のアーツの例"},
        {name: "不壊の盾", type:"防御", level: "1", judge: "自動成功", tgt: "自身", range: "なし", cost: "2", notes: "1/R や R1回 という書き方も可"},
        {name: "きらめきの壁", type:"なし", level: "1", judge: "自動成功", tgt: "範囲", range: "至近", cost: "4", notes: "LV/Sn ...「LV」はアーツのLVに置換"},
        {name: "伝説の相棒", type:"なし", level: "1", judge: "自動成功", tgt: "単体", range: "シーン", cost: "1", notes: "シナリオ[LV+1]回 ...“LV+n”は、式を[ ]か( )で囲む"},
      ],
      weapons: [
        {name: "白兵武器：小型", type: "白兵/射撃", judge: "+1", attribute: "肉体", attack: "+1+1D6", guard: "2", notes: "※判定値と種別の事例"},
        {name: "エリートクラード", type: "射撃/軍団/魔獣", judge: "社会", attribute: "社会", attack: "+2+1D6", guard: "6", notes: "※「種別：魔獣」を指定する事例"},
        {name: "虚銃 -Type Long-", type: "射撃/魔獣", judge: "@-1", attribute: "感情" , notes: "※武器限定のクリティカル値修正の事例"},
        {name: "フランケンシュタインの怪物", type: "射撃/軍団", judge: "#+1", attribute: "技術", notes: "※武器限定のファンブル値修正の事例"},
        {name: "銘刀", type: "白兵", judge: "", attribute: "技術", attack: "10(14)+1D6", notes: "※魔獣化中に攻撃力が変化する事例"},
        {name: "ガード用武器", type:"白兵", judge: "", attribute: "肉体", attack: "", guard: "7(10)", notes: "※魔獣化中にガード値が変動する事例"},
        {name: "素手：パターンA", type: "白兵", judge: "", attribute: "肉体", attack: "10+1D6(2D6)", notes: "※魔獣化中にダイス数が変化する事例"},
        {name: "素手：パターンB", type: "白兵", judge: "", attribute: "肉体", attack: "10+1(2)D6", notes: "※魔獣化中にダイス数が変化する事例"},
        {name: "素手：パターンC", type: "白兵", judge: "", attribute: "肉体", attack: "10+1D6(10+2D6)", notes: "※魔獣化中に式全体が変わる事例"},
        {name: "銘刀", type: "白兵", judge: "", attribute: "技術", attack: "10(+4)+1D6", notes: "※魔獣化中に攻撃力が変化する事例"},
        {name: "白兵武器：小型", type: "白兵", judge: "", attribute: "肉体", attack: "(:{肉体}+1)+1D6", notes: "※魔獣化中に攻撃力が変化する事例"},
        {name: "バイク", type: "乗り物", notes: "※乗り物での攻撃は基本的に白兵攻撃"},
        {name: "魔界潜水艦", type: "乗り物/魔艦", notes: "※一部の乗り物は射撃攻撃"}
      ],
      items: [
        {name: "治癒薬", type: "使い捨て", notes: "※「使い捨て」の記入位置は、備考欄でもOK"},
        {name: "再生薬x3", type: "使い捨て", notes: "※3個分として計上"}
      ]
    };
  }
});

AppHowToWrite.component("arts-sample", {
  props: ['objs'],
  template: `
    <table class="small table table-bordered">
      <thead class="bg-primary text-white fw-bold">
        <tr class="left-padding">
          <th style="width:10em;">名称</th>
          <th style="width:7em;">種別</th>
          <th style="width:3em;">LV</th>
          <th style="width:7em;">判定値</th>
          <th style="width:5em;">対象</th>
          <th style="width:5em;">射程</th>
          <th style="width:5em;">コスト</th>
          <th style="width:20em;">効果</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="obj in objs" :key="obj.name">
          <td>
            <textarea rows="2" :value="obj.name" readonly></textarea>
          </td>
          <td>
            <textarea rows="2" :value="obj.type" readonly></textarea>
          </td>
          <td>
            <textarea rows="2" :value="obj.level" readonly></textarea>
          </td>
          <td>
            <textarea rows="2" :value="obj.judge" readonly></textarea>
          </td>
          <td>
            <textarea rows="2" :value="obj.tgt" readonly></textarea>
          </td>
          <td>
            <textarea rows="2" :value="obj.range" readonly></textarea>
          </td>
          <td>
            <textarea rows="2" :value="obj.cost" readonly></textarea>
          </td>
          <td>
            <textarea rows="2" :value="obj.notes" readonly></textarea>
          </td>
        </tr>
      </tbody>
    </table>
  `
});

AppHowToWrite.component("weapon-sample", {
  props: ['objs'],
  template: `
    <table class="small table table-bordered">
      <thead class="bg-primary text-white fw-bold">
        <tr class="left-padding">
          <th>名称</th>
          <th>種別</th>
          <th>命中</th>
          <th>属性</th>
          <th>攻撃力</th>
          <th>ガード</th>
          <th>備考</th>
        </tr>
      </thead>
      <tbody v-for="obj in objs" :key="obj.name">
        <tr>
          <td>
            <textarea cols="14" rows="2" :value="obj.name" readonly></textarea>
          </td>
          <td>
            <textarea cols="10" rows="2" :value="obj.type" readonly></textarea>
          </td>
          <td>
            <textarea cols="8" rows="2" :value="obj.judge" readonly></textarea>
          </td>
          <td>
            <select :value=obj.attribute readonly disabled style="height:3.5em;">
              <option value="肉体">肉体</option>
              <option value="技術">技術</option>
              <option value="感情">感情</option>
              <option value="加護">加護</option>
              <option value="社会">社会</option>
            </select>
          </td>
          <td>
            <textarea cols="10" rows="2" :value="obj.attack" readonly></textarea>
          </td>
          <td>
            <textarea cols="6" rows="2" :value="obj.guard" readonly></textarea>
          </td>
          <td>
            <textarea cols="20" rows="2" :value="obj.notes" readonly></textarea>
          </td>
        </tr>
      </tbody>
    </table>
  `
});

AppHowToWrite.component("arts-compact", {
  props: ['objs'],
  template: `
    <table class="small table table-bordered" style="table-layout:fixed;">
      <thead class="bg-primary text-white fw-bold">
        <tr class="left-padding">
          <th style="width:10em;">名称</th>
          <th style="width:7em;">種別</th>
          <th style="width:3em;">LV</th>
          <th style="width:7em;">判定値</th>
          <th style="width:5em;">対象</th>
          <th style="width:5em;">射程</th>
          <th style="width:5em;">コスト</th>
          <th style="width:20em;">効果</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="obj in objs" :key="obj.name">
          <td>
            <input type="text" style="width:100%;" :value="obj.name" readonly>
          </td>
          <td>
            <input type="text" style="width:100%;" :value="obj.type" readonly>
          </td>
          <td>
            <input type="number" style="width:100%;" :value="obj.level" readonly>
          </td>
          <td>
            <input type="text" style="width:100%;" :value="obj.judge" readonly>
          </td>
          <td>
            <input type="text" style="width:100%;" :value="obj.tgt" readonly>
          </td>
          <td>
            <input type="text" style="width:100%;" :value="obj.range" readonly>
          </td>
          <td>
            <input type="text" style="width:100%;" :value="obj.cost" readonly>
          </td>
          <td>
            <input type="text" style="width:100%;" :value="obj.notes" readonly>
          </td>
        </tr>
      </tbody>
    </table>
  `
});

AppHowToWrite.component("weapon-compact", {
  props: ['objs'],
  template: `
    <table class="small table table-bordered" style="table-layout:fixed;">
      <thead class="bg-primary text-white fw-bold">
        <tr class="left-padding">
          <th style="width:10em;">名称</th>
          <th style="width:7em;">種別</th>
          <th style="width:7em;">命中</th>
          <th style="width:5em;">属性</th>
          <th style="width:10em;">攻撃力</th>
          <th style="width:7em;">ガード</th>
          <th style="width:20em;">備考</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="obj in objs" :key="obj.name">
          <td>
            <input type="text" style="width:100%;" :value="obj.name" readonly>
          </td>
          <td>
            <input type="text" style="width:100%;" :value="obj.type" readonly>
          </td>
          <td>
            <input type="text" style="width:100%;" :value="obj.judge" readonly>
          </td>
          <td>
            <select :value="obj.attribute" disabled style="height:1.75em;">
              <option value="肉体">肉体</option>
              <option value="技術">技術</option>
              <option value="感情">感情</option>
              <option value="加護">加護</option>
              <option value="社会">社会</option>
            </select>
          </td>
          <td>
            <input type="text" style="width:100%;" :value="obj.attack" readonly>
          </td>
          <td>
            <input type="text" style="width:100%;" :value="obj.guard" readonly>
          </td>
          <td>
            <input type="text" style="width:100%;" :value="obj.notes" readonly>
          </td>
        </tr>
      </tbody>
    </table>
  `
});

AppHowToWrite.component("item-compact", {
  props: ['objs'],
  template: `
    <table class="small table table-bordered" style="table-layout:fixed;">
      <thead class="bg-primary text-white fw-bold">
        <tr class="left-padding">
          <th style="width:10em;">名称</th>
          <th style="width:7em;">種別</th>
          <th style="width:20em;">備考</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="obj in objs" :key="obj.name">
          <td>
            <input type="text" style="width:100%;" :value="obj.name" readonly>
          </td>
          <td>
            <input type="text" style="width:100%;" :value="obj.type" readonly>
          </td>
          <td>
            <input type="text" style="width:100%;" :value="obj.notes" readonly>
          </td>
        </tr>
      </tbody>
    </table>
  `
});

const AppTutorial = AppHowToWrite.mount("#pc4x_tutorial");
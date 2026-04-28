export const mockIdeas = [
  {
    id: "1",
    title: "冷蔵庫の中身を自動で管理してくれるアプリが欲しい",
    content:
      "毎日冷蔵庫を開けて「何作ろう...」と悩む時間が無駄。期限切れで捨てる食材も多い。買い物中に冷蔵庫の中身が確認できない。家族で共有できたら二重買いも防げる。",
    chatHistory: [
      { question: "その不満は、どんなときに一番感じますか？", answer: "平日の仕事終わり、疲れて帰ってきて冷蔵庫を開けたとき。「あ、またあの野菜ダメにしてる...」と罪悪感。休日にまとめ買いしたときは特にひどいです。" },
      { question: "それは誰が一番困っていると思いますか？", answer: "共働きの家庭。うちもそうですが、夫婦で買い物に行くと「それ冷蔵庫にまだあったよ」っていう会話を週1でしてます。あとは一人暮らしの学生とか。" },
      { question: "その問題を解決できたら、どんな良いことがありますか？", answer: "食材を無駄にしないからお金の節約になる。買い物中に冷蔵庫の中身を見られたら二重買いしなくて済む。あと食品ロス削減にも貢献できる。" },
    ],
    tags: ["家事", "効率化", "主婦向け", "食品ロス"],
    likes: 234,
    comments: 18,
    author: {
      name: "田中 優子",
      avatar: "T",
    },
    createdAt: "2026-04-25T08:30:00Z",
    status: "open" as const,
    visibility: "public" as const,
    needLevel: 5,
  },
  {
    id: "2",
    title: "電車の混雑状況をリアルタイムで可視化してほしい",
    content:
      "毎朝の通勤電車が辛い。少し時間をずらせば座れるのに、駅に着くまで混雑状況がわからない。グリーン車も、空いてるかどうか乗るまでわからない。",
    chatHistory: [
      { question: "どんな時に一番「なんとかしたい」と思いますか？", answer: "月曜の朝ですね。みんな同じ時間に来るからホームも電車もギュウギュウ。あと雨の日はさらに混む。駅の改札通るまで内部の混み具合がわからないのが困る。" },
      { question: "なぜそれが解決されるといいと思いますか？", answer: "5分ずらすだけで座れるならそうしたい。混雑避けられたらストレスが減る。会社側も時差出勤を推奨しやすくなるかも。" },
    ],
    tags: ["交通", "効率化", "社会人向け", "IoT"],
    likes: 189,
    comments: 32,
    author: {
      name: "佐藤 健太",
      avatar: "S",
    },
    createdAt: "2026-04-24T18:15:00Z",
    status: "open" as const,
    visibility: "public" as const,
    needLevel: 4,
  },
  {
    id: "3",
    title: "ゴミ出しの日を忘れないように通知してほしい",
    content:
      "ゴミの日をよく忘れる。地域によってルールが違うのに引っ越すたびに覚え直し。分別も面倒くさい。特にプラスチックと燃えるゴミの区別がいまいちわからない。",
    chatHistory: [
      { question: "具体的にどんな時に困りましたか？", answer: "引っ越したばかりの時。前の地域とゴミの日が全然違って、2週間くらい出し損ねた。あと年末年始は収集日が変則的でややこしい。" },
      { question: "どうなったら理想ですか？", answer: "郵便番号入れるだけで自分の地域のカレンダーが自動でできる。前日の夜に「明日は燃えるゴミの日」って通知が来る。分別に迷ったらカメラで写すと教えてくれる。" },
      { question: "誰に使ってほしいですか？", answer: "一人暮らしを始めたばかりの人。あと引っ越しが多い人。うちの母親も分別が面倒って言ってるから高齢者にもいいかも。" },
    ],
    tags: ["家事", "生活", "学生向け", "シンプル"],
    likes: 567,
    comments: 45,
    author: {
      name: "木村 花子",
      avatar: "K",
    },
    createdAt: "2026-04-23T12:00:00Z",
    status: "in_progress" as const,
    visibility: "public" as const,
    needLevel: 5,
  },
  {
    id: "4",
    title: "子供の習い事の送迎をシェアできる仕組みが欲しい",
    content:
      "子どもの習い事の送迎で毎週土曜が潰れる。近所に同じ習い事に行ってる子がいるはずなのに繋がれない。送迎を近所の人と交代できたら助かるのに。",
    chatHistory: [
      { question: "その課題、具体的にどんな頻度・規模で起きていますか？", answer: "週2回、火曜と土曜。火曜は学校帰りでなんとかなるけど、土曜の午前中は毎週送迎。往復で1時間以上かかるから、土曜の午前中が毎週消える。" },
      { question: "もしその問題が解決したら、どんな世界になりますか？", answer: "土曜の午前中に自由時間ができる！子ども同士も送迎車の中で仲良くなれるかも。親同士のコミュニティもできるし、万が一の時に頼れる関係ができるのが一番いい。" },
    ],
    tags: ["子育て", "シェアリング", "共働き", "地域"],
    likes: 312,
    comments: 28,
    author: {
      name: "山本 真理",
      avatar: "Y",
    },
    createdAt: "2026-04-22T09:45:00Z",
    status: "open" as const,
    visibility: "public" as const,
    needLevel: 4,
  },
  {
    id: "5",
    title: "勉強中にスマホを触っちゃうのを強制的にブロックしたい",
    content:
      "テスト勉強中にSNSを見てしまう。アプリ制限かけても自分で解除しちゃう。物理的に使えなくする方法が欲しい。友達とお互いに監視し合えたらいいかも。",
    chatHistory: [
      { question: "なぜ今のアプリ制限ではダメなんですか？", answer: "自分で設定した制限だから、自分で解除できちゃうんですよね。「あと5分だけ」ってつい解除しちゃう。自制心に頼らない仕組みが欲しい。" },
      { question: "どんな仕組みなら効果がありそうですか？", answer: "友達とペアになって、お互いの制限を管理する感じ。自分じゃ解除できなくて、解除するには相手の承認が必要。で、ちゃんと集中できたらポイントが貯まる。ゲーム感覚でできたら続くかも。" },
    ],
    tags: ["学習", "学生向け", "生産性", "メンタルヘルス"],
    likes: 423,
    comments: 56,
    author: {
      name: "伊藤 翔",
      avatar: "I",
    },
    createdAt: "2026-04-21T22:30:00Z",
    status: "resolved" as const,
    visibility: "public" as const,
    needLevel: 5,
  },
  {
    id: "6",
    title: "病院の待ち時間を有効活用したい",
    content:
      "病院の待合室で30分以上待つのが苦痛。あとどれくらい待つかもわからない。順番が近くなったら通知してくれて、それまで外で待てたらいいのに。",
    chatHistory: [
      { question: "いつ一番その課題を感じますか？", answer: "子どもを連れて小児科に行く時。待合室で30分も子どもをなだめるのが大変。あとインフルエンザの流行期は2時間待ちとかザラで、その間外に出られないのが辛い。" },
      { question: "なぜ病院側はそれができていないと思いますか？", answer: "病院側にもメリットがないからだと思う。でも待合室の密を避けられるから、感染症対策としても意味があるはず。患者満足度も上がるし。" },
      { question: "どんな体験が理想ですか？", answer: "受付したら「あと◯分」って目安が出て、順番が近づいたらLINEで通知。その間は近くのカフェや公園で待てる。院内の現在の待ち人数もリアルタイムで見られるといい。" },
    ],
    tags: ["医療", "効率化", "UX改善", "ヘルスケア"],
    likes: 178,
    comments: 14,
    author: {
      name: "高橋 直子",
      avatar: "T",
    },
    createdAt: "2026-04-20T15:00:00Z",
    status: "open" as const,
    visibility: "private" as const,
    needLevel: 3,
  },
  {
    id: "7",
    title: "一人暮らしの高齢者の安否確認を、自然な形でしたい",
    content:
      "離れて暮らす親のことが心配。電話すると「大丈夫」しか言わないけど、本当に元気なのかわからない。でも監視はしたくないし、親もそういうのを嫌がる。",
    chatHistory: [
      { question: "どんな時に一番心配になりますか？", answer: "災害があった時と、あと日常的に「ちゃんと食べてるのかな」っていう不安。親は心配かけたくないから電話では元気そうに振る舞うんですよね。" },
      { question: "どういう形なら親御さんも受け入れてくれそうですか？", answer: "カメラとかは絶対嫌がる。でも、例えばポットの使用履歴とかTVのオンオフみたいな、生活の中のさりげない情報で「いつも通り」がわかれば安心。異常があった時だけ通知があればいい。" },
    ],
    tags: ["高齢者", "見守り", "健康", "家族"],
    likes: 356,
    comments: 42,
    author: {
      name: "中村 正一",
      avatar: "N",
    },
    createdAt: "2026-04-26T10:00:00Z",
    status: "open" as const,
    visibility: "public" as const,
    needLevel: 4,
  },
  {
    id: "8",
    title: "会議の時間が長すぎる問題をなんとかしたい",
    content:
      "打ち合わせの半分は無駄な時間。特に「結論から言って」って思うような前置きが長い会議が多すぎる。会議時間を自動で短くする仕組みが欲しい。",
    chatHistory: [
      { question: "特にどんな会議が無駄に感じますか？", answer: "定例の進捗報告会。一人ずつダラダラ話すから1時間じゃ足りない。でも事前に資料読めば5分で済む内容ばかり。" },
      { question: "理想の会議ってどんな感じですか？", answer: "事前に議題と資料が共有されてて、会議では「決めること」だけ。タイマーがついてて、時間オーバーしたら強制終了。議事録も自動生成される。" },
    ],
    tags: ["仕事", "効率化", "コミュニケーション"],
    likes: 287,
    comments: 23,
    author: {
      name: "加藤 隆",
      avatar: "K",
    },
    createdAt: "2026-04-26T09:15:00Z",
    status: "open" as const,
    visibility: "public" as const,
    needLevel: 3,
  },
  {
    id: "9",
    title: "ペンギンが滑るアプリを作りたい",
    content:
      "氷の上をペンギンが滑って、障害物を避けながら魚を集めるゲーム。傾きセンサーで操作できたら子どもでも楽しめる。なぜかわからないけど滑るペンギンを見てると癒される。",
    chatHistory: [
      { question: "どうしてペンギンが滑るアプリが面白いと思ったんですか？", answer: "この前水族館でペンギンが氷の上で滑ってるのを見て、めっちゃ癒されたんです。それをスマホでいつでも見られたらいいなと思って。" },
      { question: "誰に遊んでほしいですか？", answer: "まずは子ども。操作が簡単で、滑るのが面白いだけのシンプルなゲーム。でも大人も癒し系としてハマるかも。BGMはゆるい感じで。" },
      { question: "どんな機能があるといいですか？", answer: "傾きセンサーで方向操作、いろんな種類のペンギンが選べて、コスチュームも変えられる。世界中のステージ（南極とか、まちなかとか）で滑れると面白い。" },
    ],
    tags: ["ゲーム", "癒し", "子ども向け", "エンタメ"],
    likes: 156,
    comments: 12,
    author: {
      name: "渡辺 みゆき",
      avatar: "W",
    },
    createdAt: "2026-04-26T14:30:00Z",
    status: "open" as const,
    visibility: "public" as const,
    needLevel: 2,
  },
  {
    id: "10",
    title: "自炊のレシピを冷蔵庫の残り物から提案してほしい",
    content:
      "料理は好きだけど、レシピを考えるのが面倒。冷蔵庫にある食材を入力したら、それで作れるレシピを提案してくれるアプリが欲しい。「あと何を買えば一品増える」も教えてくれると最高。",
    chatHistory: [
      { question: "レシピ検索と何が違いますか？", answer: "レシピ検索って「作りたいもの」から検索するじゃないですか。そうじゃなくて「あるもの」から逆引きしたい。今日は卵とほうれん草があるから、これで何が作れる？っていう。" },
      { question: "誰に使ってほしいですか？", answer: "自炊してる人全般。特に一人暮らしで食材を余らせがちな人。あと「冷蔵庫にあるものでなんとかしたい」っていう忙しい日の共働き家庭。" },
    ],
    tags: ["料理", "家事", "効率化", "食品ロス"],
    likes: 445,
    comments: 34,
    author: {
      name: "松本 さくら",
      avatar: "M",
    },
    createdAt: "2026-04-25T19:00:00Z",
    status: "in_progress" as const,
    visibility: "public" as const,
    needLevel: 4,
  },
  {
    id: "11",
    title: "公共トイレの清潔さがリアルタイムでわかるマップ",
    content:
      "外出先でトイレに行きたくなったとき、清潔なトイレがどこにあるかわからない。特に子連れの時はオムツ替え台があるかも重要。ユーザーが清潔さを評価できるマップが欲しい。",
    chatHistory: [
      { question: "なぜ今のマップアプリではダメなんですか？", answer: "トイレの場所はわかっても、清潔さや設備は実際に行ってみないとわからない。特に子ども連れだと、行ってから「オムツ替え台がない」だと困る。" },
      { question: "どんな情報があれば十分ですか？", answer: "清潔さの5段階評価、オムツ替え台の有無、ウォシュレットの有無、混雑状況。できれば写真も。ユーザーが投票できると情報が最新に保たれる。" },
    ],
    tags: ["子育て", "マップ", "生活", "公共"],
    likes: 198,
    comments: 15,
    author: {
      name: "山本 真理",
      avatar: "Y",
    },
    createdAt: "2026-04-24T11:20:00Z",
    status: "open" as const,
    visibility: "public" as const,
    needLevel: 3,
  },
  {
    id: "12",
    title: "推し活の出費を自動で集計して予算管理したい",
    content:
      "推しのグッズやイベントにお金を使いすぎてしまう。どのくらい使ったか可視化して、月ごとの予算を設定できるアプリが欲しい。SNSと連携して推し活のスケジュール管理もできると嬉しい。",
    chatHistory: [
      { question: "どんなふうに出費が膨らみますか？", answer: "気づいたらポチってるんです。限定グッズが出るたびに買っちゃうし、イベント遠征費もバカにならない。月にいくら使ったか把握してない。" },
      { question: "アプリに求めることは？", answer: "レシートを撮ると自動で分類してくれて、予算オーバーしそうなら警告。遠征費の計算もしてほしい。あと同じ推しのファンと予算感を共有できるSNS的な機能もあると嬉しい。" },
    ],
    tags: ["趣味", "お金", "女性向け", "ライフスタイル"],
    likes: 523,
    comments: 67,
    author: {
      name: "小林 あかり",
      avatar: "K",
    },
    createdAt: "2026-04-23T21:30:00Z",
    status: "open" as const,
    visibility: "public" as const,
    needLevel: 5,
  },
  {
    id: "13",
    title: "オンライン授業中に寝てる学生を起こすシステム",
    content:
      "オンライン授業だと学生が寝てても気づけない。カメラで顔を検知して、寝てる学生がいたらバイブレーションで起こしてくれる機能が欲しい。でも監視っぽくならないようにしたい。",
    chatHistory: [
      { question: "なぜそれが問題だと思いますか？", answer: "僕自身が寝ちゃう側なんです。対面の授業なら先生に当てられて起きるけど、オンラインだと誰も気づかない。寝ててもビデオはオンだから、先生からも見えてるはずなんですけどね。" },
      { question: "どんな仕組みがいいですか？", answer: "AIが顔を検知して、寝てそうな学生だけにバイブレーション。先生には「注意している学生がいます」くらいの通知だけで、個人を特定しない。あと寝てた時間の録画を後で見返せるように。" },
    ],
    tags: ["教育", "学生向け", "AI", "オンライン"],
    likes: 267,
    comments: 38,
    author: {
      name: "伊藤 翔",
      avatar: "I",
    },
    createdAt: "2026-04-22T16:45:00Z",
    status: "resolved" as const,
    visibility: "public" as const,
    needLevel: 2,
  },
  {
    id: "14",
    title: "近所のスーパーのリアルタイム特売情報をまとめてほしい",
    content:
      "スーパーのはしごを効率的にしたい。特売情報が各店舗バラバラで比較できない。今日どのスーパーに行くべきか、AIが教えてくれると買い物の時短になる。",
    chatHistory: [
      { question: "今はどうやって特売情報を集めていますか？", answer: "各スーパーのチラシをアプリで1枚ずつ見てる。でも面倒で、結局いつものスーパーに行っちゃう。まとめて比較できたら、たまには違う店にも行くのに。" },
      { question: "どんな情報が特に重要ですか？", answer: "やっぱり生鮮食品の特売。肉と野菜はスーパーごとに値段が全然違う。自分の買い物リストと特売を照らし合わせて「どのスーパーに行くべきか」を提案してくれると嬉しい。" },
    ],
    tags: ["家事", "節約", "主婦向け", "地域"],
    likes: 390,
    comments: 21,
    author: {
      name: "田中 優子",
      avatar: "T",
    },
    createdAt: "2026-04-21T07:00:00Z",
    status: "open" as const,
    visibility: "public" as const,
    needLevel: 4,
  },
];

export interface ChatMessage {
  question: string;
  answer: string;
}

export interface MockIdea {
  id: string;
  title: string;
  content: string;
  chatHistory: ChatMessage[];
  tags: string[];
  likes: number;
  comments: number;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  status: "open" | "in_progress" | "resolved";
  visibility: "public" | "private";
  needLevel: 1 | 2 | 3 | 4 | 5;
}

export const mockComments = [
  {
    id: "c1",
    ideaId: "1",
    author: { name: "エンジニア大好き", avatar: "E" },
    content:
      "これめっちゃ欲しいです！うちも毎週食材ダメにしてます...特に野菜室が無法地帯です。冷蔵庫のカメラで自動認識とかできるんでしょうか？",
    createdAt: "2026-04-25T14:20:00Z",
  },
  {
    id: "c2",
    ideaId: "1",
    author: { name: "田中 優子", avatar: "T" },
    content:
      "カメラ認識があると最高ですね！でもまずはバーコードスキャンからでも十分嬉しいです。あと、家族で共有できると買い物の二重買いが防げそうです。",
    createdAt: "2026-04-25T15:45:00Z",
  },
  {
    id: "c3",
    ideaId: "1",
    author: { name: "プロトタイパー", avatar: "P" },
    content:
      "面白いアイディアですね！アイディアを元にプロトタイプを作ってみました。ぜひ触ってみてください。",
    createdAt: "2026-04-25T20:10:00Z",
  },
];

export const mockPrototypes = [
  {
    id: "p1",
    ideaId: "1",
    title: "ReFridge MVP",
    description: "冷蔵庫管理アプリのプロトタイプです。Reactで作りました。",
    githubUrl: "https://github.com/example/refridge",
    demoUrl: "https://refridge.vercel.app",
    author: { name: "プロトタイパー", avatar: "P" },
    likes: 45,
  },
  {
    id: "p2",
    ideaId: "5",
    title: "FocusLock Chrome Extension",
    description: "SNSブロック機能をChrome拡張で実装しました。",
    githubUrl: "https://github.com/example/focuslock",
    demoUrl: "https://focuslock.vercel.app",
    author: { name: "週末エンジニア", avatar: "W" },
    likes: 32,
  },
];

export const mockUserProfile = {
  name: "ユーザー",
  avatar: "U",
  totalIdeas: 6,
  totalLikes: 1245,
  totalComments: 67,
  totalContributions: 23,
  ideas: [
    { ...mockIdeas[0], author: { name: "ユーザー", avatar: "U" }, visibility: "public" as const },
    { ...mockIdeas[3], author: { name: "ユーザー", avatar: "U" }, visibility: "public" as const },
    { ...mockIdeas[7], author: { name: "ユーザー", avatar: "U" }, visibility: "public" as const },
    {
      id: "u-private-1",
      title: "家計簿アプリにAI予測機能が欲しい",
      content: "手動で家計簿つけるのが面倒。銀行やクレカから自動で取り込んで、来月の支出をAIが予測してくれると助かる。でもまだ誰にも見せたくないアイディア。",
      chatHistory: [],
      tags: ["お金", "家計", "AI"],
      likes: 0,
      comments: 0,
      author: { name: "ユーザー", avatar: "U" },
      createdAt: "2026-04-26T23:15:00Z",
      status: "open" as const,
      visibility: "private" as const,
    },
    {
      id: "u-private-2",
      title: "図書館の蔵書をAIがおすすめしてくれるサービス",
      content: "図書館に行っても何を借りていいかわからない。過去の貸出履歴と今の気分からAIがおすすめしてほしい。自分用のメモとして残しておく。",
      chatHistory: [],
      tags: ["読書", "AI", "図書館", "生活"],
      likes: 0,
      comments: 0,
      author: { name: "ユーザー", avatar: "U" },
      createdAt: "2026-04-27T07:45:00Z",
      status: "open" as const,
      visibility: "private" as const,
    },
  ],
  notifications: [
    { type: "like" as const, ideaTitle: "冷蔵庫の中身を自動で管理してくれるアプリが欲しい", count: 12, time: "2時間前" },
    { type: "comment" as const, ideaTitle: "ゴミ出しの日を忘れないように通知してほしい", count: 3, time: "昨日" },
    { type: "prototype" as const, ideaTitle: "電車の混雑状況をリアルタイムで可視化してほしい", count: 1, time: "2日前" },
  ],
  contributions: [
    { ideaTitle: "勉強中にスマホを触っちゃうのを強制的にブロックしたい", action: "コメントしました", time: "3日前" },
    { ideaTitle: "子供の習い事の送迎をシェアできる仕組みが欲しい", action: "いいねしました", time: "1週間前" },
    { ideaTitle: "病院の待ち時間を有効活用したい", action: "プロトタイプを投稿しました", time: "2週間前" },
  ],
  myComments: [
    { ideaId: "1", ideaTitle: "冷蔵庫の中身を自動で管理してくれるアプリが欲しい", content: "これすごく共感します！うちも同じ悩みです。期限切れアラートがあるといいですね。", time: "2時間前", ideaAuthor: "田中 優子" },
    { ideaId: "5", ideaTitle: "勉強中にスマホを触っちゃうのを強制的にブロックしたい", content: "友達とペアで制御するアイディアいいですね。自分も使ってみたいです。", time: "3日前", ideaAuthor: "伊藤 翔" },
    { ideaId: "12", ideaTitle: "推し活の出費を自動で集計して予算管理したい", content: "推し活あるあるですね...遠征費の計算機能は需要ありそうです。", time: "1週間前", ideaAuthor: "小林 あかり" },
    { ideaId: "10", ideaTitle: "自炊のレシピを冷蔵庫の残り物から提案してほしい", content: "冷蔵庫にあるもので作れるのは便利！ジャンルも選べるといいですね。", time: "2週間前", ideaAuthor: "松本 さくら" },
  ],
};

export const mockOtherUser = {
  name: "木村 花子",
  avatar: "K",
  totalIdeas: 5,
  totalLikes: 892,
  ideas: [mockIdeas[2], mockIdeas[5]],
};

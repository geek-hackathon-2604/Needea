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
  totalIdeas: 8,
  totalLikes: 1245,
  totalComments: 67,
  totalContributions: 23,
  ideas: mockIdeas.slice(0, 3).map((idea) => ({
    ...idea,
    author: { name: "ユーザー", avatar: "U" },
  })),
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
};

export const mockOtherUser = {
  name: "木村 花子",
  avatar: "K",
  totalIdeas: 5,
  totalLikes: 892,
  ideas: [mockIdeas[2], mockIdeas[5]],
};

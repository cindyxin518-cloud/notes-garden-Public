const baseQuotes = [
  { zh: "世界大了，人就小了；目光远了，事就小了", en: "When the world grows larger, the self grows smaller; when the view reaches farther, troubles become lighter.", category: "短句", source: "文摘" },
  { zh: "自由而真实地活出你本来的样子", en: "Live freely and truthfully as who you really are.", category: "自我", source: "文摘" },
  { zh: "阅读是一座随身携带的避难所", en: "Reading is a refuge you can carry with you.", category: "阅读", source: "文摘" },
  { zh: "我扎根于此，但我流动不止。", en: "I am rooted but I flow.", category: "英文", source: "Virginia Woolf" },
  { zh: "好事将要发生。", en: "It'll help the luck stick.", category: "英文", source: "文摘" },
  { zh: "你能想象的一切都是真实的。", en: "Everything you can imagine is real.", category: "英文", source: "Pablo Picasso" },
  { zh: "接受成长，也接受一切不欢而散。", en: "Accept growth, and accept that some things end without harmony.", category: "成长", source: "文摘" },
  { zh: "时间不会治愈痛苦，它只是教会你如何与痛苦共处。", en: "Time does not heal pain. It teaches you how to live with it.", category: "英文", source: "文摘" },
  { zh: "不要数着日子过，要让每一天都有意义。", en: "Do not count the days; make the days count.", category: "英文", source: "Muhammad Ali" },
  { zh: "有福读书，可慰平生。", en: "Blessed with reading, you carry comfort throughout your life.", category: "阅读", source: "文摘" },
  { zh: "知足知不足，有为有不为。", en: "Know contentment and also know what is lacking; know what to do and what to leave undone.", category: "短句", source: "文摘" },
  { zh: "你是自己生命的守门人。每一天，你都可以自己决定怎么活。", en: "You are the gatekeeper of your own life. Every day, you decide how to live.", category: "自我", source: "文摘" },
  { zh: "只有在日常生活中不断练习放手，才能坦然接受烦恼、衰老、病患和死亡。", en: "Only by practicing release in ordinary days can we meet worry, aging, illness, and death with calm.", category: "放下", source: "文摘" },
  { zh: "不要在自己看重的事情上投入不切实际的期待，因为人生唯一确定的就是不确定。", en: "Do not load what you cherish with unrealistic expectations, because life's only certainty is uncertainty.", category: "人生", source: "文摘" },
  { zh: "所谓贵人，是打破你原有思维、提高认知、提升境界，并带你走向更高平台的人。", en: "A benefactor is someone who breaks old thinking, expands your understanding, and lifts you to a higher place.", category: "认知", source: "文摘" },
  { zh: "放下执念，善待自己。读书使人不惑，赚钱使人不屈。", en: "Let go of obsession and be kind to yourself. Reading brings clarity; earning brings resilience.", category: "修行", source: "稻盛和夫" },
  { zh: "果断拒绝制造不安的人，远离让你陷入负面情绪的人；失去他们，是幸福的开始。", en: "Firmly refuse those who unsettle you and step away from those who drag you into negativity; losing them begins your happiness.", category: "边界", source: "加藤谛三" },
  { zh: "目标优先常让人延迟快乐。成功之路不止一条，不必认定某个场景出现才算满意。", en: "A goal-first mindset often postpones happiness. There is more than one road to success; no single scene has to define a satisfied life.", category: "人生", source: "文摘" },
  { zh: "灵魂的觉醒、思想的升华和人格的独立，才是真正的才华。", en: "The awakening of the soul, the elevation of thought, and independence of character are true talent.", category: "自我", source: "叔本华" },
  { zh: "人既要被繁华震撼过，又要被质朴感动过；两者之间丈量着生命的宽度。", en: "A life needs to be struck by splendor and moved by simplicity; between the two lies its breadth.", category: "人生", source: "《半山文集》" },
  { zh: "你想逃离的，恰是需要接纳的；你害怕的，恰是该面对的。", en: "What you want to escape is what you need to accept; what you fear is what you must face.", category: "接纳", source: "《你在逃避什么》" },
  { zh: "久利之事勿为，众争之地勿往，利可共不可独，谋可寡不可众。", en: "Avoid gains that last too long and places everyone fights for; share profit, and keep strategy with the few.", category: "处世", source: "曾国藩" },
  { zh: "当你能毫不犹豫地拒绝别人，且不带内疚感，快意人生才真正开始。", en: "When you can refuse without hesitation or guilt, a freer life truly begins.", category: "边界", source: "史铁生" },
  { zh: "当人不再想象生活，而是全力投入生活，生活之美就会超越想象。", en: "When we stop imagining life and fully enter it, its beauty surpasses imagination.", category: "生活", source: "《半山文集》" },
  { zh: "你站在良知一边，他站在赢者一边，这是价值观不同。", en: "You stand with conscience; he stands with the winner. That is a difference in values.", category: "认知", source: "毛姆《月亮与六便士》" },
  { zh: "沉淀自己最好的方式，是在繁华中自律，安静处自省，低谷时自强。", en: "The best way to settle yourself is discipline in bustle, reflection in quiet, and strength in low moments.", category: "成长", source: "克罗德·西蒙" },
  { zh: "人生无论怎么精心策划，都抵不过一场命运的安排。", en: "However carefully life is planned, it can still yield to a turn of fate.", category: "人生", source: "林徽因" },
  { zh: "真正能给你撑腰的，是知识储备、经济基础、情绪稳定、可控节奏和打不败的自己。", en: "What truly backs you up is knowledge, financial footing, emotional steadiness, a livable rhythm, and an unbroken self.", category: "自我", source: "微语录" },
  { zh: "一路走来的风尘是拍不掉的，你得像蚌一样，把砂粒变成珍珠。", en: "The dust of the road cannot simply be brushed off; become like an oyster and turn grit into pearls.", category: "成长", source: "《半山文集》" },
  { zh: "一个人自身拥有越丰富，对身外之物的需求就越少。", en: "The richer a person is within, the less they need from what lies outside.", category: "自我", source: "叔本华《人生的智慧》" },
  { zh: "你不可能同时拥有春花和秋月。学会权衡与放弃，才可能得到些什么。", en: "You cannot have spring blossoms and autumn moonlight at once. Learn to weigh and release before you can receive.", category: "取舍", source: "星云大师" },
  { zh: "只有走在路上，才能摆脱局限和执着，让选择与探寻都生机勃勃。", en: "Only on the road can you loosen limits and attachments, making every choice and search alive.", category: "远方", source: "余秋雨《文化苦旅》" },
  { zh: "成长是独立生存和独立思考的自我奋斗；成熟是消除傲慢与偏见的自我修行。", en: "Growth is the struggle for independent living and thought; maturity is the practice of dissolving arrogance and prejudice.", category: "成长", source: "文摘" },
  { zh: "人生如尺，必须有度。最好的关系是亲疏有度，相看不厌，久处不累。", en: "Life is like a ruler: it needs measure. The best relationships keep a graceful distance and never become tiring.", category: "关系", source: "稻盛和夫" },
  { zh: "家人闲坐，灯火可亲。愿所念之人平安喜乐，所想之事顺心如意。", en: "Family sitting idly, lamplight warm. May those you miss be safe and joyful, and what you hope for unfold smoothly.", category: "生活", source: "文摘" },
  { zh: "当才华配不上野心，请静下心来努力；总有一天你会破土而出。", en: "When talent cannot yet match ambition, quiet yourself and work; one day you will break through the soil.", category: "成长", source: "文摘" },
  { zh: "注意你的思想、语言、行为、习惯和性格，因为它们会成为你的命运。", en: "Watch your thoughts, words, actions, habits, and character, for they become your destiny.", category: "习惯", source: "文摘" },
  { zh: "生活坏到一定程度就会好起来。努力过后才知道，坚持坚持，就过来了。", en: "When life gets bad enough, it begins to turn. After effort, you learn that holding on carries you through.", category: "坚持", source: "文摘" },
  { zh: "短暂成功或许靠才华、颜值和努力，长久成功终究靠品性。", en: "Brief success may come from talent, looks, or effort; lasting success rests on character.", category: "品性", source: "文摘" },
  { zh: "即使前行时沾了一身泥，只要坚持走下去，总有一天泥巴会干燥掉落。", en: "Even if you move forward covered in mud, keep walking; one day it will dry and fall away.", category: "坚持", source: "《银魂》" },
  { zh: "改变永远不嫌晚。只要确定目标，一步一步往前走，人生随时可能翻盘。", en: "It is never too late to change. Set a direction, move step by step, and life can turn at any moment.", category: "改变", source: "文摘" },
  { zh: "再高的山、再长的路，都敌不过你一步一个脚印的坚持。", en: "No mountain is too high and no road too long for steady steps and persistence.", category: "坚持", source: "文摘" },
  { zh: "既然无处可逃，不如喜悦；既然没有净土，不如静心；既然没有如愿，不如释然。", en: "Since there is nowhere to flee, choose joy; since no pure land appears, quiet the heart; since wishes fail, let go.", category: "释然", source: "丰子恺" },
  { zh: "感恩，是对自己当下生活的尊重和认可。", en: "Gratitude means respecting and accepting the life you have right now.", category: "感恩", source: "文摘" },
  { zh: "年轻人，你的职责是平整土地，而非焦虑时光；三四月做的事，八九月自有答案。", en: "Your duty is to level the ground, not worry over time; what you do in spring will answer in late summer.", category: "成长", source: "余世存《时间之书》" },
  { zh: "每天反复做的事情造就了我们。优秀不是一种行为，而是一种习惯。", en: "We are shaped by what we repeatedly do. Excellence is not an act, but a habit.", category: "习惯", source: "亚里士多德" },
  { zh: "这短短的一生，我们最终都会失去。你不妨大胆一些，爱一个人，攀一座山，追一个梦。", en: "In this short life, we will lose everything in the end. Be bold: love someone, climb a mountain, chase a dream.", category: "勇气", source: "《大鱼海棠》" },
  { zh: "别怕路途遥远，也别想生活艰难；走一步有一步的风景，进一步有一步的欢喜。", en: "Do not fear the long road or dwell on hardship; every step brings a view, every step forward a small joy.", category: "远方", source: "文摘" },
  { zh: "只要迈出那一步，就会发现其实所有一切早就准备好了。", en: "Once you take that step, you may find everything was ready all along.", category: "勇气", source: "《撒野》" },
  { zh: "别再为错过懊悔。真正属于你的，只会迟到，不会错过。", en: "Do not keep regretting what you missed. What truly belongs to you may arrive late, but it will not miss you.", category: "释然", source: "文摘" },
  { zh: "不必太纠结当下，也不必太忧虑未来；经历一些事后，眼前风景已和从前不同。", en: "Do not cling too tightly to now or worry too much about the future; after some experiences, the view before you changes.", category: "释然", source: "村上春树" },
  { zh: "世界上任何书籍都不能带给你好运，但它们能让你悄悄成为你自己。", en: "No book can bring you luck, but books can quietly help you become yourself.", category: "阅读", source: "赫尔曼·黑塞" },
  { zh: "成熟的标志之一，是明白每天发生在自己身上 99% 的事情，于别人毫无意义。", en: "One mark of maturity is realizing that 99% of what happens to you each day means little to others.", category: "成熟", source: "马克·鲍尔莱恩" },
  { zh: "今年的我们不同于去年的我们。若还能爱着另一个也在变化的人，是一件幸运的事。", en: "We are not who we were last year. To keep loving another changing person is a kind of luck.", category: "关系", source: "毛姆" },
  { zh: "世界不会在意你的自尊，人们看到的只是你的成就。", en: "The world will not dwell on your pride; people see what you have achieved.", category: "现实", source: "菲茨杰拉德《了不起的盖茨比》" },
  { zh: "再甜不能甜孩子，再苦不能苦自己。儿孙自有儿孙福，没有儿孙我享福。", en: "Do not give every sweetness to children or every bitterness to yourself. Descendants have their own fortune; without them, enjoy your own.", category: "生活", source: "文摘" },
  { zh: "我希望每个人都尽可能活出自己，并按照自己喜欢的方式生活。", en: "I hope everyone lives as themselves as fully as possible, in the way they like.", category: "自我", source: "梭罗《瓦尔登湖》" },
  { zh: "没有一颗心会因为追求梦想而受伤。当你真心渴望某样东西，整个宇宙都会来帮忙。", en: "No heart is wounded by pursuing a dream. When you truly desire something, the universe comes to help.", category: "梦想", source: "保罗·戈埃罗《牧羊少年奇幻之旅》" },
  { zh: "好的友谊都是自然而然形成的，不是刻意求得的；再好的朋友也应该有距离。", en: "Good friendships form naturally, not by force; even the best friends need distance.", category: "关系", source: "周国平" },
  { zh: "没有人可以回到过去重新开始，但谁都可以从今天开始，书写一个全然不同的结局。", en: "No one can return to the past and begin again, but anyone can start today and write a different ending.", category: "改变", source: "文摘" },
  { zh: "生命好在无意义，才容得下各自赋予意义。", en: "Life is fortunate in having no fixed meaning; that leaves room for each of us to give it one.", category: "人生", source: "木心《素履之往》" },
  { zh: "如果生活优越，不要收敛斗志；如果百般设障，更不要磨灭信心和勇气。", en: "If life treats you well, do not soften your drive; if it blocks you at every turn, do not lose faith or courage.", category: "勇气", source: "文摘" },
  { zh: "抓住一件东西不放时，你只能拥有它；肯放手，才有机会选择别的。", en: "When you cling to one thing, that is all you can hold; when you release it, other choices appear.", category: "放下", source: "文摘" },
  { zh: "你没有义务做一年前、一天前，甚至十五分钟前的自己。你天生拥有变化和成长的权利。", en: "You are not obliged to be who you were a year, a day, or fifteen minutes ago. You have the right to change and grow.", category: "成长", source: "韧心旎" },
  { zh: "发生在世界上的事情没有一样出于偶然，终有一天一切都会有解释。", en: "Nothing in the world happens by pure accident; one day, everything will find its explanation.", category: "信念", source: "文摘" },
  { zh: "遇到不可理喻的事情，接受、处理、远离、不追问。", en: "When something unreasonable appears: accept it, handle it, step away, and do not keep asking why.", category: "处世", source: "文摘" },
  { zh: "时光，浓淡相宜。人心，远近相安。流年，长短皆逝。浮生，往来皆客。", en: "Time has its shades; hearts have their distances. Years pass whether long or short; in this floating life, all are passing guests.", category: "短句", source: "陈继儒《小窗幽记》" },
  { zh: "我们曾如此期盼外界的认可，到最后才知道，世界是自己的，与他人毫无关系。", en: "We once longed so much for outside approval, only to learn in the end that the world is our own and has little to do with others.", category: "自我", source: "杨绛《一百岁感言》" },
  { zh: "无论改进建议多么合乎逻辑、对组织多么有益，都可以预料到它们会遭遇很大的阻力。", en: "However logical your improvement suggestions are, and however much they benefit the organization, you can expect a great deal of resistance.", category: "改变", source: "文摘" },
  { zh: "人们抵制变革，因为变革会破坏不成文的权利和承诺网络。换句话说：维持现状与人们的个人利益息息相关。", en: "People resist change because it disrupts a network of unwritten rights and promises. Put differently, people have a personal stake in maintaining the status quo.", category: "改变", source: "文摘" },
  { zh: "只有当人们认为现状无法持久时，他们才会放弃现状。", en: "People abandon the status quo only when they assess that the current situation will not last.", category: "改变", source: "文摘" }
];

const dutchTranslations = [
  "Wanneer de wereld groter wordt, wordt het zelf kleiner; wanneer je blik verder reikt, worden zorgen lichter.",
  "Leef vrij en waarachtig als wie je werkelijk bent.",
  "Lezen is een toevluchtsoord dat je met je meedraagt.",
  "Ik ben geworteld, maar ik stroom.",
  "Er staat iets moois te gebeuren.",
  "Alles wat je je kunt voorstellen, is echt.",
  "Aanvaard groei, en aanvaard ook dat sommige dingen zonder harmonie eindigen.",
  "Tijd geneest pijn niet. Ze leert je ermee te leven.",
  "Tel de dagen niet; laat de dagen tellen.",
  "Gezegend met lezen draag je je leven lang troost met je mee.",
  "Ken tevredenheid en ken ook wat ontbreekt; weet wat je moet doen en wat je moet laten.",
  "Jij bent de poortwachter van je eigen leven. Elke dag bepaal je hoe je leeft.",
  "Alleen door in gewone dagen loslaten te oefenen, kun je zorgen, ouderdom, ziekte en dood kalm tegemoet treden.",
  "Leg geen onrealistische verwachtingen op wat je dierbaar is, want de enige zekerheid van het leven is onzekerheid.",
  "Een weldoener is iemand die oud denken doorbreekt, je begrip verruimt en je naar een hoger niveau tilt.",
  "Laat obsessie los en wees vriendelijk voor jezelf. Lezen brengt helderheid; verdienen brengt veerkracht.",
  "Weiger vastberaden mensen die je onrust geven en neem afstand van wie je in negativiteit trekt; hen verliezen is het begin van geluk.",
  "Een doel-eerst mentaliteit stelt geluk vaak uit. Er is meer dan een weg naar succes; geen enkel scenario hoeft je tevredenheid te bepalen.",
  "Het ontwaken van de ziel, de verheffing van het denken en onafhankelijkheid van karakter zijn echt talent.",
  "Een leven moet geraakt worden door pracht en ontroerd door eenvoud; daartussen ligt zijn breedte.",
  "Waarvan je wilt vluchten, is wat je moet aanvaarden; waar je bang voor bent, is wat je onder ogen moet zien.",
  "Vermijd winst die te lang duurt en plekken waar iedereen om strijdt; deel voordeel en houd strategie bij weinigen.",
  "Wanneer je zonder aarzeling of schuldgevoel kunt weigeren, begint een vrijer leven echt.",
  "Wanneer we ophouden het leven te verbeelden en er volledig instappen, overtreft de schoonheid ervan onze verbeelding.",
  "Jij staat aan de kant van het geweten; hij staat aan de kant van de winnaar. Dat is een verschil in waarden.",
  "De beste manier om jezelf te laten bezinken is discipline in drukte, reflectie in stilte en kracht in lage momenten.",
  "Hoe zorgvuldig het leven ook gepland is, het kan alsnog buigen voor een wending van het lot.",
  "Wat je werkelijk steun geeft, is kennis, financiële basis, emotionele stabiliteit, een leefbaar ritme en een ongebroken zelf.",
  "Het stof van de weg kun je niet zomaar afkloppen; word als een oester en verander zand in parels.",
  "Hoe rijker iemand vanbinnen is, hoe minder hij nodig heeft van wat buiten hem ligt.",
  "Je kunt niet tegelijk lentebloesem en herfstmaan bezitten. Leer afwegen en loslaten voordat je kunt ontvangen.",
  "Alleen onderweg kun je grenzen en gehechtheid losser maken, zodat elke keuze en zoektocht levend wordt.",
  "Groei is de strijd om zelfstandig te leven en te denken; volwassenheid is de oefening om arrogantie en vooroordelen op te lossen.",
  "Het leven is als een liniaal: het vraagt maat. De beste relaties houden een gracieuze afstand en worden niet vermoeiend.",
  "Familie zit rustig bijeen, lamplicht is warm. Mogen wie je mist veilig en blij zijn, en mogen je wensen soepel verlopen.",
  "Wanneer talent je ambitie nog niet kan dragen, word stil en werk; op een dag breek je door de grond.",
  "Let op je gedachten, woorden, daden, gewoonten en karakter, want zij worden je lot.",
  "Wanneer het leven slecht genoeg wordt, begint het te keren. Na inspanning leer je dat volhouden je erdoorheen draagt.",
  "Kort succes kan komen door talent, uiterlijk of inzet; blijvend succes rust op karakter.",
  "Ook als je vooruitgaat onder de modder, blijf lopen; op een dag droogt die op en valt hij van je af.",
  "Het is nooit te laat om te veranderen. Kies een richting, ga stap voor stap, en het leven kan elk moment keren.",
  "Geen berg is te hoog en geen weg te lang voor gestage stappen en volharding.",
  "Omdat er nergens heen te vluchten is, kies vreugde; omdat er geen zuiver land verschijnt, kalmeer het hart; omdat wensen mislukken, laat los.",
  "Dankbaarheid betekent het leven dat je nu hebt respecteren en aanvaarden.",
  "Je taak is de grond effenen, niet je zorgen maken over tijd; wat je in de lente doet, krijgt in de nazomer antwoord.",
  "Wij worden gevormd door wat we herhaaldelijk doen. Uitmuntendheid is geen daad, maar een gewoonte.",
  "In dit korte leven verliezen we uiteindelijk alles. Wees moedig: heb iemand lief, beklim een berg, jaag een droom na.",
  "Vrees de lange weg niet en blijf niet hangen in moeite; elke stap brengt uitzicht, elke stap vooruit een klein geluk.",
  "Zodra je die stap zet, kun je merken dat alles allang klaarstond.",
  "Blijf niet treuren om wat je miste. Wat echt bij je hoort, kan laat komen, maar het zal je niet missen.",
  "Klem je niet te stevig vast aan nu en maak je niet te veel zorgen over de toekomst; na sommige ervaringen verandert het uitzicht voor je.",
  "Geen boek kan je geluk brengen, maar boeken kunnen je stilletjes helpen jezelf te worden.",
  "Een teken van volwassenheid is beseffen dat 99% van wat jou elke dag overkomt voor anderen weinig betekent.",
  "Wij zijn niet wie we vorig jaar waren. Iemand blijven liefhebben die ook verandert, is een vorm van geluk.",
  "De wereld blijft niet stilstaan bij je trots; mensen zien wat je hebt bereikt.",
  "Geef niet alle zoetheid aan kinderen en alle bitterheid aan jezelf. Nakomelingen hebben hun eigen geluk; zonder hen, geniet van je eigen leven.",
  "Ik hoop dat iedereen zo volledig mogelijk zichzelf leeft, op de manier die bij hem of haar past.",
  "Geen hart raakt gewond door een droom na te jagen. Wanneer je iets werkelijk verlangt, komt het universum helpen.",
  "Goede vriendschappen ontstaan vanzelf, niet door dwang; zelfs de beste vrienden hebben afstand nodig.",
  "Niemand kan terug naar het verleden om opnieuw te beginnen, maar iedereen kan vandaag beginnen en een ander einde schrijven.",
  "Het leven is gelukkig omdat het geen vaste betekenis heeft; zo blijft er ruimte voor ieder van ons om er een te geven.",
  "Als het leven je goed behandelt, laat je gedrevenheid niet verzachten; als het je steeds blokkeert, verlies dan geen geloof of moed.",
  "Wanneer je je aan één ding vastklampt, is dat alles wat je kunt vasthouden; wanneer je het loslaat, verschijnen andere keuzes.",
  "Je bent niet verplicht te zijn wie je een jaar, een dag of vijftien minuten geleden was. Je hebt het recht om te veranderen en te groeien.",
  "Niets in de wereld gebeurt puur toevallig; op een dag vindt alles zijn verklaring.",
  "Wanneer iets onredelijks verschijnt: aanvaard het, handel het af, neem afstand en blijf niet vragen waarom.",
  "Tijd heeft schakeringen; harten hebben afstanden. Jaren gaan voorbij, lang of kort; in dit zwevende leven zijn allen voorbijgaande gasten.",
  "We verlangden ooit zo naar erkenning van buitenaf, om uiteindelijk te leren dat de wereld van onszelf is en weinig met anderen te maken heeft.",
  "Hoe logisch je verbeteringsvoorstellen ook zijn en hoeveel voordeel ze de organisatie ook brengen, je kunt veel weerstand verwachten.",
  "Mensen verzetten zich tegen verandering omdat die een netwerk van ongeschreven rechten en beloften verstoort. Anders gezegd: mensen hebben persoonlijk belang bij de status quo.",
  "Mensen laten de status quo pas los wanneer ze inschatten dat de huidige situatie niet zal blijven duren."
];

baseQuotes.forEach((quote, index) => {
  quote.id = `base-${index}`;
  quote.nl = dutchTranslations[index] || "";
});

let userQuotes = JSON.parse(localStorage.getItem("userQuotes") || "[]");
let publicVisitorQuotes = [];
let quotes = [];

const quoteGrid = document.querySelector("#quoteGrid");
const filters = document.querySelector("#filters");
const categoryGrid = document.querySelector("#categoryGrid");
const categoryHome = document.querySelector("#categories");
const collection = document.querySelector("#collection");
const collectionTitle = document.querySelector("#collectionTitle");
const contributeForm = document.querySelector("#contributeForm");
const contributeStatus = document.querySelector("#contributeStatus");
const newText = document.querySelector("#newText");
const newEnglish = document.querySelector("#newEnglish");
const newTheme = document.querySelector("#newTheme");
const newSource = document.querySelector("#newSource");
const searchInput = document.querySelector("#searchInput");
const resultCount = document.querySelector("#resultCount");
const emptyState = document.querySelector("#emptyState");
const collectionNote = document.querySelector("#collectionNote");
const totalCount = document.querySelector("#totalCount");
const categoryCount = document.querySelector("#categoryCount");
const mostPopularCount = document.querySelector("#favoriteCount");
const readerAddedCount = document.querySelector("#readerAddedCount");
const themeBtn = document.querySelector("#themeBtn");
const visitorWelcome = document.querySelector("#visitorWelcome");
const visitorNumber = document.querySelector("#visitorNumber");
const proofreadModal = document.querySelector("#proofreadModal");
const proofreadForm = document.querySelector("#proofreadForm");
const proofreadText = document.querySelector("#proofreadText");
const proofreadClose = document.querySelector("#proofreadClose");
const proofreadCancel = document.querySelector("#proofreadCancel");

let activeCategory = "";
let collectionMode = "category";
let activeProofreadIndex = null;
const visitorCounterEndpoint = "https://notes-garden-counter.cindyxin518.workers.dev";

function prepareStoredQuote(quote, index, prefix) {
  return {
    ...quote,
    id: quote.id || `${prefix}-${index}`,
    nl: quote.nl || "",
    source: quote.source || "Visitor submission"
  };
}

function rebuildQuotes() {
  userQuotes = userQuotes.map((quote, index) => prepareStoredQuote(quote, index, "local"));
  publicVisitorQuotes = publicVisitorQuotes.map((quote, index) => prepareStoredQuote(quote, index, "visitor"));
  quotes = [...baseQuotes, ...publicVisitorQuotes, ...userQuotes];
}

function quoteKey(index) {
  return quotes[index]?.id || `quote-${index}`;
}

function mergePublicReactions(counts = {}, myReactions = {}) {
  reactionCounts = { ...reactionCounts, ...counts };
  Object.entries(myReactions).forEach(([id, reaction]) => {
    reactions[id] = { ...(reactions[id] || {}), ...reaction };
  });
  saveFavorites();
}

rebuildQuotes();

if (localStorage.getItem("reactionResetV4") !== "done") {
  localStorage.removeItem("quoteFavorites");
  localStorage.removeItem("quoteReactions");
  localStorage.removeItem("quoteReactionCounts");
  localStorage.setItem("reactionResetV4", "done");
}

let reactions = JSON.parse(localStorage.getItem("quoteReactions") || "{}");
let reactionCounts = JSON.parse(localStorage.getItem("quoteReactionCounts") || "{}");
let publicComments = JSON.parse(localStorage.getItem("quotePublicComments") || "{}");

Object.values(reactions).forEach((reaction) => {
  delete reaction.resonate;
  delete reaction.save;
});

Object.entries(reactions).forEach(([index, reaction]) => {
  reactionCounts[index] = reactionCounts[index] || {};
  delete reactionCounts[index].save;
  if (reaction.like && !reactionCounts[index].like) reactionCounts[index].like = 1;
});

const allCategory = "All";
const artOfWarThemeId = "The Art of War";
const themeGroups = [
  { id: artOfWarThemeId, label: "The Art of War" },
  { id: "Wisdom", label: "Wisdom" },
  { id: "Self", label: "Self" },
  { id: "Growth", label: "Growth" },
  { id: "Life", label: "Life" },
  { id: "Relationships", label: "Relationships" },
  { id: "Reading", label: "Reading" },
  { id: "Others", label: "Others" }
];
const groupIds = themeGroups.map((group) => group.id);
const artOfWarSections = [
  {
    title: "Strategic Thinking",
    detail: "Long-range judgment, positioning, timing, and choosing when not to fight.",
    notes: [
      {
        zh: "上兵伐谋，其次伐交，其次伐兵",
        en: "The highest form of warfare is to attack strategy; next is to disrupt alliances; only then comes direct military confrontation.",
        background: "This line reflects Sun Tzu's belief that the best victory happens before open conflict begins. Attacking strategy means understanding the opponent's plan, weakening its logic, and changing the conditions of competition. Direct confrontation is not the first option, but the last visible stage of a deeper strategic process.",
        reality: "In business and life, the strongest move is often not to fight harder, but to change the game. A company may win by shaping customer habits, building stronger partnerships, or making a competitor's original plan less effective. For individuals, it means solving the root logic of a problem instead of only reacting to visible conflict."
      },
      {
        zh: "胜兵先胜而后求战",
        en: "Victorious warriors win first and then go to war.",
        background: "Sun Tzu argues that real victory is created through preparation, positioning, timing, and discipline before the battle starts. A strong army does not rely on luck during the fight; it enters the fight only after the conditions for success have already been built.",
        reality: "This is very relevant to modern work. Good outcomes rarely come only from last-minute effort. They come from preparation, clear positioning, strong resources, and good timing. In business, a successful product launch often wins before launch day through research, customer understanding, team alignment, and execution readiness."
      },
      {
        zh: "兵无常势，水无常形",
        en: "There are no constant conditions in warfare, just as water has no constant shape.",
        background: "Sun Tzu compares warfare to water because water changes shape according to the terrain. Strategy should not be fixed or mechanical. A wise commander adapts to the environment, the opponent, resources, timing, and unexpected changes.",
        reality: "This idea connects strongly with today's uncertain business world. Markets change, customers change, technology changes, and competitors move quickly. A fixed plan can become a weakness. The real capability is not only having a strategy, but knowing when to adjust it without losing direction."
      }
    ]
  },
  {
    title: "Human Nature & Leadership",
    detail: "Reading people, incentives, morale, trust, and the qualities of command.",
    notes: [
      {
        zh: "知彼知己，百战不殆",
        en: "If you know the enemy and know yourself, you need not fear the result of a hundred battles.",
        background: "This is one of the most famous ideas in The Art of War. Sun Tzu emphasizes that success depends on understanding both sides: the opponent's strengths, weaknesses, motives, and context, as well as one's own limits, resources, and blind spots.",
        reality: "In real life, many mistakes come from knowing only one side. A company may understand its product but not its customers. A person may understand others' weaknesses but not their own habits. Better decisions come from double awareness: external reality and internal self-knowledge."
      },
      {
        zh: "将者，智、信、仁、勇、严也",
        en: "A true commander possesses wisdom, trustworthiness, benevolence, courage, and discipline.",
        background: "Sun Tzu describes the qualities of a good commander: wisdom, trustworthiness, benevolence, courage, and discipline. Leadership is not based only on power or authority. It requires judgment, credibility, care for people, courage under pressure, and the ability to maintain order.",
        reality: "This is still a useful leadership model today. A good leader needs intelligence, but also trust. They need kindness, but also standards. They need courage, but not recklessness. In organizations, leadership becomes stronger when people feel both supported and clearly guided."
      },
      {
        zh: "上下同欲者胜",
        en: "Those whose people share the same purpose will prevail.",
        background: "This line means that victory comes when leaders and people share the same purpose. Sun Tzu understood that alignment is a strategic force. Even with good resources, a group becomes weak if people move in different directions or do not believe in the goal.",
        reality: "In modern organizations, alignment is often more powerful than control. A team works better when people understand the purpose, not just the task. In business transformation, especially digital transformation, people are more willing to change when they see why the change matters and how they are part of it."
      }
    ]
  },
  {
    title: "Resource Allocation",
    detail: "Using limited energy, attention, people, money, and time where they matter most.",
    notes: [
      {
        zh: "兵贵胜，不贵久",
        en: "In warfare, victory matters more than prolonged campaigns.",
        background: "Sun Tzu warns against long and exhausting campaigns. War consumes resources, energy, morale, and time. The goal is not to stay in conflict for as long as possible, but to reach a meaningful result before costs become too heavy.",
        reality: "This applies directly to business and personal projects. Long projects without clear progress can drain teams and resources. A good strategy is not only ambitious, but also efficient. The question is not how long we can continue, but how to create real results before momentum is lost."
      },
      {
        zh: "以正合，以奇胜",
        en: "Engage with orthodox methods, but win through unconventional strategies.",
        background: "Sun Tzu suggests that ordinary or direct methods can be used to engage, but unexpected methods create victory. The regular approach builds stability, while the unconventional approach creates surprise, differentiation, and advantage.",
        reality: "In business, companies often need both. Standard processes keep the organization reliable, but innovation creates advantage. A brand may compete with normal products, but win through a surprising business model, customer experience, channel strategy, or emotional connection."
      },
      {
        zh: "善战者，致人而不致于人",
        en: "Those skilled in warfare make others respond to them, rather than being controlled by others.",
        background: "This line means skilled strategists shape the situation so that others have to respond to them. They do not passively follow the opponent's rhythm. They create pressure, choices, and conditions that make others react.",
        reality: "In real life, this means moving from reactive to proactive. A strong company does not only respond to market changes; it shapes customer expectations, sets industry standards, or creates new categories. For individuals, it means designing your path instead of only reacting to other people's decisions."
      }
    ]
  },
  {
    title: "Information & Game Theory",
    detail: "Signals, uncertainty, asymmetry, intelligence, and moves made under incomplete knowledge.",
    notes: [
      {
        zh: "兵者，诡道也",
        en: "All warfare is based on deception.",
        background: "Sun Tzu's idea of deception is not simply about lying. It is about information asymmetry, misdirection, timing, and controlling what the opponent can see. In conflict, what people believe can be as important as what is actually happening.",
        reality: "In modern life, this idea should be used carefully and ethically. It reminds us that information shapes decisions. In business, brands manage signals, timing, positioning, and expectations. In personal life, it also reminds us not to judge too quickly based only on what is visible."
      },
      {
        zh: "知彼之情者，能用兵矣",
        en: "He who understands the enemy's conditions is capable of directing warfare.",
        background: "This line highlights the importance of understanding the opponent's real condition: their emotions, resources, pressures, intentions, and constraints. Strategy is not only about numbers or visible strength. It is also about reading the deeper situation behind behavior.",
        reality: "In business, good decisions often come from understanding what customers, competitors, partners, or employees are really experiencing. Data is useful, but context gives data meaning. A manager who understands people's real concerns can make better decisions than one who only looks at surface indicators."
      },
      {
        zh: "兵贵神速",
        en: "Speed is the essence of warfare.",
        background: "Sun Tzu values speed because opportunities in conflict are often temporary. When timing is right, delay can turn advantage into weakness. Speed does not mean rushing blindly; it means acting quickly when preparation and timing come together.",
        reality: "In modern business, speed can be a competitive advantage. Companies that learn faster, test faster, and respond faster often gain momentum before others react. For individuals, it means not waiting for perfect certainty. Sometimes a good decision at the right time is better than a perfect decision made too late."
      }
    ]
  },
  {
    title: "Organization & Coordination",
    detail: "Command, discipline, trust, coordination, and building a system that can execute.",
    notes: [
      {
        zh: "治众如治寡",
        en: "Managing a large force is the same as managing a small one.",
        background: "Sun Tzu says that managing many people is like managing a few when there is good structure, clear communication, and proper coordination. Scale itself is not the main problem. The real challenge is whether the system can organize complexity.",
        reality: "This is highly relevant to modern organizations. A large company can still move effectively if roles, processes, information flows, and decision rights are clear. Without structure, even a small team can feel chaotic. Good organization turns complexity into manageable coordination."
      },
      {
        zh: "令素行以教其民，则民服",
        en: "When discipline is consistently practiced, people will follow willingly.",
        background: "This line emphasizes consistency in discipline and instruction. People follow more willingly when rules are practiced regularly, not suddenly imposed during crisis. Trust in leadership is built through repeated, predictable behavior.",
        reality: "In organizations, culture is not created by slogans. It is created by consistent habits, routines, and standards. If a company only demands discipline when problems appear, people may resist. But when expectations are clear and practiced over time, coordination becomes more natural."
      },
      {
        zh: "将能而君不御者胜",
        en: "When capable generals are trusted without excessive interference, victory follows.",
        background: "Sun Tzu argues that capable generals need trust and autonomy. If the ruler interferes too much, even a skilled commander cannot respond effectively to real conditions. Good leadership means knowing when to guide and when to step back.",
        reality: "This is very relevant to modern management. When capable teams are micromanaged, speed and judgment suffer. Senior leaders should set direction, provide resources, and clarify goals, but allow local teams or experts to make decisions close to the real situation."
      }
    ]
  },
  {
    title: "Psychology & Decision-Making",
    detail: "Pressure, perception, deception, restraint, and making clear choices under tension.",
    notes: [
      {
        zh: "能而示之不能",
        en: "When capable, appear incapable.",
        background: "This line reflects Sun Tzu's use of perception as a strategic tool. When strength is hidden, the opponent may misjudge the situation. The point is not strength alone, but how strength is revealed, concealed, or timed.",
        reality: "In modern life, this can be understood as strategic modesty and timing. Not every capability needs to be shown immediately. In business, a company may quietly build technology, partnerships, or market knowledge before making a visible move. Sometimes patience protects advantage."
      },
      {
        zh: "乱生于治，怯生于勇",
        en: "Disorder may arise from order, and fear may arise from courage.",
        background: "Sun Tzu reminds us that appearances can be misleading. Disorder may hide an underlying order, and fear may appear even where courage exists. What looks weak or chaotic from the outside may actually be part of a deeper pattern.",
        reality: "This idea helps us avoid shallow judgment. In business, a competitor may look quiet but be preparing carefully. A team may look uncertain but still have strong capability. In personal decisions, it reminds us to look beneath appearances and ask what structure, pressure, or intention may be hidden behind behavior."
      },
      {
        zh: "投之亡地然后存，陷之死地然后生",
        en: "Place people in desperate situations, and they will survive; place them in deadly ground, and they will fight to live.",
        background: "Sun Tzu describes how extreme pressure can sometimes awaken survival energy and unity. When retreat is no longer possible, people may become more focused, courageous, and committed. This idea comes from battlefield psychology and the human response to urgent stakes.",
        reality: "In modern life, this should not mean intentionally harming people or creating unnecessary crisis. A healthier interpretation is that clear stakes can increase focus. When teams understand that a challenge truly matters, they often become more creative, united, and determined. Pressure can reveal hidden strength, but it must be handled responsibly."
      }
    ]
  }
];
const categoryGroups = {
  短句: "Wisdom",
  认知: "Wisdom",
  修行: "Wisdom",
  处世: "Wisdom",
  取舍: "Wisdom",
  习惯: "Wisdom",
  品性: "Wisdom",
  自我: "Self",
  成长: "Growth",
  改变: "Growth",
  成熟: "Growth",
  人生: "Life",
  生活: "Life",
  感恩: "Life",
  现实: "Life",
  梦想: "Life",
  信念: "Life",
  关系: "Relationships",
  边界: "Relationships",
  阅读: "Reading",
  英文: "Others",
  放下: "Others",
  接纳: "Others",
  远方: "Others",
  坚持: "Others",
  释然: "Others",
  勇气: "Others"
};
function normalize(value) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function groupForQuote(quote) {
  return categoryGroups[quote.category] || (groupIds.includes(quote.category) ? quote.category : "Others");
}

function categoryLabel(category) {
  if (category === allCategory || category === "全部") return allCategory;
  return categoryGroups[category] || (groupIds.includes(category) ? category : "Others");
}

function resolveGroup(value) {
  if (value === allCategory || value === "全部") return allCategory;
  if (groupIds.includes(value)) return value;
  return categoryGroups[value] || "Others";
}

function updateStats() {
  if (totalCount) totalCount.textContent = quotes.length;
  categoryCount.textContent = themeGroups.length;
  mostPopularCount.textContent = getTotalPopularityScore();
  readerAddedCount.textContent = publicVisitorQuotes.length + userQuotes.length;
  saveFavorites();
}

function saveFavorites() {
  localStorage.setItem("quoteReactions", JSON.stringify(reactions));
  localStorage.setItem("quoteReactionCounts", JSON.stringify(reactionCounts));
}

function savePublicComments() {
  localStorage.setItem("quotePublicComments", JSON.stringify(publicComments));
}

function getVisitorId() {
  let visitorId = localStorage.getItem("notesGardenVisitorId");
  if (!visitorId) {
    visitorId = crypto.randomUUID ? crypto.randomUUID() : `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem("notesGardenVisitorId", visitorId);
  }
  return visitorId;
}

async function initVisitorCounter() {
  if (!visitorWelcome || !visitorNumber) return;
  try {
    const response = await fetch(visitorCounterEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId: getVisitorId() })
    });
    if (!response.ok) throw new Error("Visitor counter unavailable");
    const data = await response.json();
    if (!data.visitorNumber) return;
    visitorNumber.textContent = Number(data.visitorNumber).toLocaleString();
    visitorWelcome.hidden = false;
  } catch (error) {
    visitorWelcome.hidden = true;
  }
}

async function loadPublicState() {
  try {
    const response = await fetch(`${visitorCounterEndpoint}/state?visitorId=${encodeURIComponent(getVisitorId())}`);
    if (!response.ok) throw new Error("Public state unavailable");
    const data = await response.json();
    publicVisitorQuotes = Array.isArray(data.visitorNotes) ? data.visitorNotes : [];
    publicComments = data.comments || publicComments;
    mergePublicReactions(data.reactionCounts || {}, data.myReactions || {});
    rebuildQuotes();
    updateStats();
    renderCategoryCards();
    renderContributionThemes();
    renderQuotes();
  } catch (error) {
    rebuildQuotes();
  }
}

async function togglePublicLike(index, liked) {
  const id = quoteKey(index);
  const response = await fetch(`${visitorCounterEndpoint}/reaction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitorId: getVisitorId(), quoteId: id, liked })
  });
  if (!response.ok) throw new Error("Like sync unavailable");
  const data = await response.json();
  reactions[id] = { ...(reactions[id] || {}), like: Boolean(data.liked) };
  reactionCounts[id] = { ...(reactionCounts[id] || {}), like: Number(data.count || 0) };
  saveFavorites();
}

async function addPublicComment(index, text) {
  const response = await fetch(`${visitorCounterEndpoint}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quoteId: quoteKey(index), text })
  });
  if (!response.ok) throw new Error("Comment sync unavailable");
  const data = await response.json();
  publicComments = data.comments || publicComments;
  savePublicComments();
}

async function addPublicVisitorNote(quote) {
  const response = await fetch(`${visitorCounterEndpoint}/note`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note: quote })
  });
  if (!response.ok) throw new Error("Visitor note sync unavailable");
  const data = await response.json();
  publicVisitorQuotes = data.visitorNotes || publicVisitorQuotes;
  rebuildQuotes();
}

function renderFilters() {
  filters.innerHTML = themeGroups
    .map((group) => {
      const href = group.id === artOfWarThemeId ? "#collection/art-of-war" : `#category/${encodeURIComponent(group.id)}`;
      return `<a class="filter-chip ${group.id === activeCategory ? "is-active" : ""}" href="${href}">${escapeHtml(group.label)}</a>`;
    })
    .join("");
}

function renderCategoryCards() {
  categoryGrid.innerHTML = themeGroups
    .map((group) => {
      if (group.id === artOfWarThemeId) {
        return `
          <a class="category-card category-card-special" href="#collection/art-of-war">
            <strong>${escapeHtml(group.label)}</strong>
            <span>Special notes on strategy, judgment, resources, information, leadership, and decisions.</span>
            <em>Open</em>
          </a>
        `;
      }
      const groupQuotes = quotes.filter((quote) => groupForQuote(quote) === group.id);
      const sample = groupQuotes[0];
      return `
        <a class="category-card" href="#category/${encodeURIComponent(group.id)}">
          <strong>${escapeHtml(group.label)}</strong>
          <span>${groupQuotes.length} notes${sample ? ` · ${escapeHtml(sample.en || sample.zh)}` : ""}</span>
          <em>Open</em>
        </a>
      `;
    })
    .join("");
}

function renderContributionThemes() {
  newTheme.innerHTML = themeGroups
    .map((group) => `<option value="${group.id}">${escapeHtml(group.label)}</option>`)
    .join("");
}

function getReaction(index, key) {
  return Boolean(reactions[quoteKey(index)]?.[key]);
}

function getReactionCount(index, key) {
  return reactionCounts[quoteKey(index)]?.[key] || 0;
}

function getMostPopularScore() {
  return Object.values(reactionCounts).reduce((max, counts) => {
    const score = counts.like || 0;
    return Math.max(max, score);
  }, 0);
}

function getPopularityScore(index) {
  const counts = reactionCounts[quoteKey(index)] || {};
  return counts.like || 0;
}

function getTotalPopularityScore() {
  return Object.values(reactionCounts).reduce((total, counts) => {
    return total + (counts.like || 0);
  }, 0);
}

function getMostPopularIndex() {
  let bestIndex = 0;
  let bestScore = -1;
  quotes.forEach((quote, index) => {
    const counts = reactionCounts[quoteKey(index)] || {};
    const score = counts.like || 0;
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });
  return bestIndex;
}

function reactionButton(index, key, label, iconPath) {
  const active = getReaction(index, key);
  const count = getReactionCount(index, key);
  return `
    <button class="reaction-btn ${active ? "is-active" : ""}" type="button" data-reaction="${key}" data-index="${index}" aria-label="${label}">
      <svg viewBox="0 0 24 24" aria-hidden="true">${iconPath}</svg>
      <span>${label}</span>
      <span>${count}</span>
    </button>
  `;
}

function commentBoard(index) {
  const comments = publicComments[quoteKey(index)] || [];
  if (!comments.length) return "";
  return `
    <div class="comment-board" aria-label="Public comments">
      <span>Public messages</span>
      ${comments.map((comment) => `
        <p>${escapeHtml(comment.text)}</p>
      `).join("")}
    </div>
  `;
}

function quoteCard(quote, index) {
  const isLong = (quote.zh || "").length + (quote.en || "").length + (quote.nl || "").length > 180;
  const body = [
    quote.zh ? `<p class="quote-text quote-zh">${escapeHtml(quote.zh)}</p>` : "",
    quote.en ? `<p class="quote-text quote-en">${escapeHtml(quote.en)}</p>` : "",
    quote.nl ? `<p class="quote-text quote-nl"><span>Dutch</span>${escapeHtml(quote.nl)}</p>` : ""
  ].join("");
  return `
    <article class="quote-card ${isLong ? "long" : ""}" id="quote-${index}">
      <div class="quote-body">
        ${body}
      </div>
      <div class="reader-actions" aria-label="Reader actions">
        ${reactionButton(index, "like", "Like", '<path d="M7 10v11M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3l3.7-6.6A2 2 0 0 1 14.42 4a2 2 0 0 1 .58 1.88Z" />')}
        <button class="reaction-btn note-action" type="button" data-proofread="${index}">Refine</button>
      </div>
      ${commentBoard(index)}
    </article>
  `;
}

function getVisibleQuotes() {
  const keyword = normalize(searchInput.value.trim());
  return quotes
    .map((quote, index) => ({ quote, index }))
    .filter(({ quote, index }) => {
      if (collectionMode === "popular") return getPopularityScore(index) > 0;
      if (collectionMode === "visitor") return index >= baseQuotes.length;
      return activeCategory === allCategory || groupForQuote(quote) === activeCategory;
    })
    .filter(({ quote }) => {
      if (!keyword) return true;
      return normalize(`${quote.zh || ""}${quote.en || ""}${categoryLabel(quote.category)}${quote.category}${quote.source}`).includes(keyword);
    });
}

function renderQuotes() {
  const visibleQuotes = getVisibleQuotes();
  if (collectionMode === "popular") {
    visibleQuotes.sort((a, b) => getPopularityScore(b.index) - getPopularityScore(a.index));
  }
  quoteGrid.innerHTML = visibleQuotes.map(({ quote, index }) => quoteCard(quote, index)).join("");
  resultCount.textContent = `Showing ${visibleQuotes.length} notes`;
  emptyState.classList.toggle("is-visible", visibleQuotes.length === 0);
  focusQuoteFromHash();
}

const artDetailLabels = {
  background: "Background",
  reality: "Reality Link"
};

function getArtOfWarNote(sectionIndex, noteIndex) {
  const section = artOfWarSections[Number(sectionIndex)];
  const note = section?.notes[Number(noteIndex)];
  if (!section || !note) return null;
  return { section, note, sectionIndex: Number(sectionIndex), noteIndex: Number(noteIndex) };
}

function artOfWarSectionCard(section, sectionIndex) {
  const notes = section.notes
    .map((note, noteIndex) => `
      <li class="strategy-note">
        <strong>${escapeHtml(note.zh)}</strong>
        <em>${escapeHtml(note.en)}</em>
        <div class="strategy-note-actions" aria-label="The Art of War note details">
          <a class="strategy-detail-btn" href="#collection/art-of-war/${sectionIndex}/${noteIndex}/background">Background</a>
          <a class="strategy-detail-btn" href="#collection/art-of-war/${sectionIndex}/${noteIndex}/reality">Reality Link</a>
        </div>
      </li>
    `)
    .join("");

  return `
    <article class="strategy-card">
      <span>Special Notes · The Art of War</span>
      <h3>${escapeHtml(section.title)}</h3>
      <p>${escapeHtml(section.detail)}</p>
      <ul class="strategy-notes">
        ${notes}
      </ul>
    </article>
  `;
}

function renderArtOfWarSections() {
  quoteGrid.innerHTML = artOfWarSections.map(artOfWarSectionCard).join("");
  resultCount.textContent = `${artOfWarSections.length} strategy sections`;
  emptyState.classList.remove("is-visible");
}

function renderArtOfWarDetail(sectionIndex, noteIndex, detailType) {
  const item = getArtOfWarNote(sectionIndex, noteIndex);
  if (!item || !artDetailLabels[detailType]) {
    showArtOfWarCollection();
    return;
  }
  const { section, note } = item;
  const detailText = detailType === "background" ? note.background : note.reality;
  const backgroundHref = `#collection/art-of-war/${sectionIndex}/${noteIndex}/background`;
  const realityHref = `#collection/art-of-war/${sectionIndex}/${noteIndex}/reality`;

  quoteGrid.innerHTML = `
    <article class="strategy-detail-page">
      <a class="back-link strategy-back-link" href="#collection/art-of-war">Back to The Art of War</a>
      <p class="eyebrow">${escapeHtml(section.title)}</p>
      <h3>${escapeHtml(note.zh)}</h3>
      <p class="strategy-detail-translation">${escapeHtml(note.en)}</p>
      <div class="strategy-note-actions strategy-detail-tabs" aria-label="Switch The Art of War detail">
        <a class="strategy-detail-btn ${detailType === "background" ? "is-active" : ""}" href="${backgroundHref}">Background</a>
        <a class="strategy-detail-btn ${detailType === "reality" ? "is-active" : ""}" href="${realityHref}">Reality Link</a>
      </div>
      <section class="strategy-detail-copy" aria-label="${escapeHtml(artDetailLabels[detailType])}">
        <h4>${escapeHtml(artDetailLabels[detailType])}</h4>
        <p>${escapeHtml(detailText)}</p>
      </section>
    </article>
  `;
  resultCount.textContent = "";
  emptyState.classList.remove("is-visible");
}

quoteGrid.addEventListener("click", async (event) => {
  const proofreadButton = event.target.closest("[data-proofread]");
  if (proofreadButton) {
    activeProofreadIndex = proofreadButton.dataset.proofread;
    proofreadText.value = "";
    proofreadModal.hidden = false;
    proofreadText.focus();
    return;
  }

  const button = event.target.closest("[data-reaction]");
  if (!button) return;
  const index = button.dataset.index;
  const key = button.dataset.reaction;
  const id = quoteKey(index);
  const nextValue = !reactions[id]?.[key];
  try {
    await togglePublicLike(index, nextValue);
  } catch (error) {
    const nextCount = nextValue
      ? getReactionCount(index, key) + 1
      : Math.max(0, getReactionCount(index, key) - 1);
    reactions[id] = { ...(reactions[id] || {}), [key]: nextValue };
    reactionCounts[id] = {
      ...(reactionCounts[id] || {}),
      [key]: nextCount
    };
  }
  saveFavorites();
  updateStats();
  renderQuotes();
});

function closeProofreadDialog() {
  proofreadModal.hidden = true;
  activeProofreadIndex = null;
  proofreadText.value = "";
}

proofreadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = proofreadText.value.trim();
  if (!text || activeProofreadIndex === null) return;
  try {
    await addPublicComment(activeProofreadIndex, text);
  } catch (error) {
    const id = quoteKey(activeProofreadIndex);
    publicComments[id] = [
      ...(publicComments[id] || []),
      { text, createdAt: new Date().toISOString() }
    ];
  }
  savePublicComments();
  closeProofreadDialog();
  renderQuotes();
});

proofreadClose.addEventListener("click", closeProofreadDialog);
proofreadCancel.addEventListener("click", closeProofreadDialog);
proofreadModal.addEventListener("click", (event) => {
  if (event.target === proofreadModal) {
    closeProofreadDialog();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !proofreadModal.hidden) {
    closeProofreadDialog();
  }
});

document.querySelector(".stats-band").addEventListener("click", (event) => {
  const button = event.target.closest("[data-stat-link]");
  if (!button) return;

  if (button.dataset.statLink === "art-of-war") {
    window.location.hash = "#collection/art-of-war";
    return;
  }

  if (button.dataset.statLink === "all") {
    window.location.hash = `#category/${allCategory}`;
    return;
  }

  if (button.dataset.statLink === "themes") {
    document.querySelector("#categories").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (button.dataset.statLink === "reader-added") {
    window.location.hash = "#collection/visitor-added";
    return;
  }

  window.location.hash = "#collection/most-popular";
});

contributeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = newText.value.trim();
  const english = newEnglish.value.trim();
  const quote = {
    id: `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    zh: text,
    en: english,
    nl: "",
    category: newTheme.value,
    source: newSource.value.trim() || "Visitor submission",
    language: "Preferred language"
  };

  if (!text) {
    contributeStatus.textContent = "Please add note text.";
    return;
  }

  try {
    await addPublicVisitorNote(quote);
  } catch (error) {
    userQuotes.push(quote);
    localStorage.setItem("userQuotes", JSON.stringify(userQuotes));
    rebuildQuotes();
  }
  contributeForm.reset();
  newTheme.value = quote.category;
  contributeStatus.textContent = "Added. Thank you for contributing.";
  updateStats();
  renderCategoryCards();
  window.location.hash = `#category/${encodeURIComponent(quote.category)}`;
  if (activeCategory === quote.category) {
    renderQuotes();
  }
});

function showHome() {
  categoryHome.hidden = false;
  collection.hidden = true;
  activeCategory = "";
  collectionMode = "category";
  document.title = "Notes Garden | I am rooted but I flow";
  updateStats();
}

function showCategory(category) {
  activeCategory = resolveGroup(category);
  if (activeCategory === artOfWarThemeId) {
    showArtOfWarCollection();
    return;
  }
  collectionMode = "category";
  categoryHome.hidden = true;
  collection.hidden = false;
  collectionTitle.textContent = activeCategory === allCategory ? "Search Results" : `${categoryLabel(activeCategory)} Notes`;
  document.title = `${collectionTitle.textContent} | Notes Garden`;
  collectionNote.textContent = "Collected reading notes. AI translations may be imperfect; corrections and reflections are welcome.";
  updateStats();
  filters.hidden = false;
  renderFilters();
  renderQuotes();
}

function showSpecialCollection(mode) {
  collectionMode = mode;
  activeCategory = allCategory;
  categoryHome.hidden = true;
  collection.hidden = false;
  collectionTitle.textContent = mode === "popular" ? "Most Popular Notes" : "Added by Visitor";
  document.title = `${collectionTitle.textContent} | Notes Garden`;
  collectionNote.textContent = mode === "popular"
    ? "Public likes help visitors discover notes that others found meaningful."
    : "Notes shared by visitors. New entries appear here after they are added.";
  resultCount.textContent = "";
  updateStats();
  filters.hidden = true;
  renderQuotes();
}

function showArtOfWarCollection() {
  collectionMode = "art-of-war";
  activeCategory = artOfWarThemeId;
  categoryHome.hidden = true;
  collection.hidden = false;
  collectionTitle.textContent = "Special Notes: The Art of War";
  document.title = "Special Notes: The Art of War | Notes Garden";
  collectionNote.textContent = "A strategy notebook inspired by The Art of War, organized around judgment, resources, information, leadership, and decision-making.";
  updateStats();
  filters.hidden = false;
  renderFilters();
  renderArtOfWarSections();
}

function showArtOfWarDetail(sectionIndex, noteIndex, detailType) {
  collectionMode = "art-of-war-detail";
  activeCategory = artOfWarThemeId;
  categoryHome.hidden = true;
  collection.hidden = false;
  collectionTitle.textContent = artDetailLabels[detailType] || "The Art of War";
  document.title = `${collectionTitle.textContent} | The Art of War | Notes Garden`;
  collectionNote.textContent = "A closer reading of one strategy note from The Art of War.";
  updateStats();
  filters.hidden = true;
  renderArtOfWarDetail(sectionIndex, noteIndex, detailType);
}

function route() {
  const hash = window.location.hash;
  if (hash === "#collection/most-popular") {
    showSpecialCollection("popular");
    return;
  }
  if (hash === "#collection/visitor-added") {
    showSpecialCollection("visitor");
    return;
  }
  const artDetailMatch = hash.match(/^#collection\/art-of-war\/(\d+)\/(\d+)\/(background|reality)$/);
  if (artDetailMatch) {
    showArtOfWarDetail(artDetailMatch[1], artDetailMatch[2], artDetailMatch[3]);
    return;
  }
  if (hash === "#collection/art-of-war") {
    showArtOfWarCollection();
    return;
  }
  if (hash.startsWith("#category/")) {
    const category = decodeURIComponent(hash.replace("#category/", "").split("/")[0]);
    showCategory(category);
    return;
  }
  showHome();
  if (hash === "#top") {
    document.querySelector("#top").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function focusQuoteFromHash() {
  const match = window.location.hash.match(/quote-(\d+)/);
  if (!match) return;
  const card = document.querySelector(`#quote-${match[1]}`);
  if (!card) return;
  card.classList.add("is-targeted");
  card.scrollIntoView({ behavior: "smooth", block: "center" });
}

searchInput.addEventListener("input", () => {
  if (collection.hidden) {
    window.location.hash = `#category/${allCategory}`;
    return;
  }
  if (collectionMode === "art-of-war") {
    renderArtOfWarSections();
    return;
  }
  renderQuotes();
});
themeBtn.addEventListener("click", () => {
  document.body.dataset.theme = document.body.dataset.theme === "evening" ? "" : "evening";
});
window.addEventListener("hashchange", route);

updateStats();
renderContributionThemes();
renderCategoryCards();
route();
initVisitorCounter();
loadPublicState();

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

const sourcedNotes = [
  {
    "id": "curated-mgl-001",
    "zh": "能带给你内心安宁的，只有你自己。",
    "en": "Nothing can bring you peace but yourself.",
    "nl": "Alleen jijzelf kunt je innerlijke rust brengen.",
    "category": "Self",
    "source": "拉尔夫·沃尔多·爱默生 / Ralph Waldo Emerson · Self-Reliance《论自立》，收于 Essays: First Series · 1841",
    "reference": {
      "author": "拉尔夫·沃尔多·爱默生 / Ralph Waldo Emerson",
      "work": "Self-Reliance《论自立》，收于 Essays: First Series",
      "date": "1841",
      "locator": "文章末尾",
      "url": "https://www.gutenberg.org/cache/epub/2944/pg2944-images.html",
      "sourceType": "随笔",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "文章把自我信任与外界认可区分开来。这是关于精神独立的主张，不是说人不需要关系与支持。",
      "question": "我的安宁，有多少交给了别人的评价？",
      "verification": "已在作品全文核对；初版年份另见弗吉尼亚大学版本说明。",
      "additionalSources": [
        {
          "label": "弗吉尼亚大学：1841 年版本说明",
          "url": "https://anthologydev.lib.virginia.edu/work/Emerson/emerson-self-reliance"
        }
      ]
    }
  },
  {
    "id": "curated-mgl-002",
    "zh": "知人者智，自知者明。",
    "en": "Knowing others is wisdom; knowing yourself is clarity.",
    "nl": "Wie anderen kent, is wijs; wie zichzelf kent, ziet helder.",
    "category": "Self",
    "source": "传统署名老子 / Laozi · 《道德经》 · 先秦；具体成书年份未定",
    "reference": {
      "author": "传统署名老子 / Laozi",
      "work": "《道德经》",
      "date": "先秦；具体成书年份未定",
      "locator": "第 33 章",
      "url": "https://ctext.org/dao-de-jing",
      "sourceType": "古籍",
      "originalLanguage": "古汉语",
      "chineseStatus": "古籍原文，转简体",
      "englishStatus": "本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "原章同时谈到知人、自知、胜人、自胜。了解自己，与识别人和驾驭外界，是不同的能力。",
      "question": "我很会判断别人，却是否看清了自己？",
      "verification": "已核对传世文本；作者归属及成书年代存在学术争议，不标伪精确年份。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-003",
    "zh": "我辽阔，包容万千。",
    "en": "I am large . . . . I contain multitudes.",
    "nl": "Ik ben groot; ik herberg velen.",
    "category": "Self",
    "source": "沃尔特·惠特曼 / Walt Whitman · Leaves of Grass《草叶集》；后来题为 Song of Myself《自我之歌》的诗 · 1855",
    "reference": {
      "author": "沃尔特·惠特曼 / Walt Whitman",
      "work": "Leaves of Grass《草叶集》；后来题为 Song of Myself《自我之歌》的诗",
      "date": "1855",
      "locator": "1855 年初版；后来的分节版本为第 51 节",
      "url": "https://whitmanarchive.org/published-writings/leaves-of-grass/1855-variorum/main.html",
      "sourceType": "诗歌",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "这句紧接对自身矛盾的承认。人的复杂性未必是一种需要立即消除的缺陷。",
      "question": "我能不能允许自己同时拥有不止一种声音？",
      "verification": "已核对惠特曼档案的 1855 年初版文本；不把后来的诗题和节号当成初版原有格式。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-004",
    "zh": "你的学历、你的履历，并不等于你的人生。",
    "en": "Your qualifications, your CV, are not your life.",
    "nl": "Je diploma’s en je cv zijn niet je leven.",
    "category": "Growth",
    "source": "J. K. 罗琳 / J. K. Rowling · The Fringe Benefits of Failure, and the Importance of Imagination，哈佛毕业演讲 · 2008-06-05",
    "reference": {
      "author": "J. K. 罗琳 / J. K. Rowling",
      "work": "The Fringe Benefits of Failure, and the Importance of Imagination，哈佛毕业演讲",
      "date": "2008-06-05",
      "locator": "谈论失败与人生价值的段落",
      "url": "https://news.harvard.edu/gazette/story/2008/06/text-of-j-k-rowling-speech/",
      "sourceType": "演讲",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "她在演讲中回顾失败带来的重新认识，提醒毕业生不要把个人价值压缩成成就清单。",
      "question": "如果删掉履历上的所有称号，我还会怎样介绍自己？",
      "verification": "已核对哈佛发布的演讲全文；日期为演讲日期。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-005",
    "zh": "只有回望时，你才能把那些点连起来。",
    "en": "You can only connect them looking backwards.",
    "nl": "Je kunt die punten alleen verbinden als je terugkijkt.",
    "category": "Growth",
    "source": "史蒂夫·乔布斯 / Steve Jobs · 斯坦福毕业演讲；官方刊题 You’ve got to find what you love · 2005-06-12",
    "reference": {
      "author": "史蒂夫·乔布斯 / Steve Jobs",
      "work": "斯坦福毕业演讲；官方刊题 You’ve got to find what you love",
      "date": "2005-06-12",
      "locator": "第一个故事：Connecting the dots",
      "url": "https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says",
      "sourceType": "演讲",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "这句话出自他回顾书法课程如何影响 Macintosh 字体设计的故事。它描述回望时才显现的联系，不保证每次绕路都会带来成功。",
      "question": "有没有一段当时看似无用的经历，后来改变了我？",
      "verification": "已核对斯坦福发布的演讲全文；短句为连续摘录。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-006",
    "zh": "当我们懂得如何面对痛苦，痛苦就会少得多。",
    "en": "When we know how to suffer, we suffer much, much less.",
    "nl": "Als we leren omgaan met lijden, lijden we veel, veel minder.",
    "category": "Growth",
    "source": "一行禅师 / Thich Nhat Hanh · No Mud, No Lotus: The Art of Transforming Suffering · 2014",
    "reference": {
      "author": "一行禅师 / Thich Nhat Hanh",
      "work": "No Mud, No Lotus: The Art of Transforming Suffering",
      "date": "2014",
      "locator": "梅村官网的本书介绍引文",
      "url": "https://plumvillage.org/books/no-mud-no-lotus",
      "sourceType": "书籍；官方书介摘引",
      "originalLanguage": "英语版本",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "这本书讨论认识、照顾痛苦，而不是否认痛苦。这里的成长不是要求自己立刻恢复正常。",
      "question": "我是在照顾痛苦，还是一直试图掩盖它？",
      "verification": "引文已在作者所属梅村的官方书介核对；出版年份另由出版社资料核对。未核定书内页码。",
      "additionalSources": [
        {
          "label": "梅村书目中的引文",
          "url": "https://plumvillage.org/mindfulness/books"
        },
        {
          "label": "出版社出版日期",
          "url": "https://penguinrandomhousehighereducation.com/book/?isbn=9781937006853"
        }
      ]
    }
  },
  {
    "id": "curated-mgl-007",
    "zh": "但请在你们的相聚中，留一些空间。",
    "en": "But let there be spaces in your togetherness,",
    "nl": "Maar laat er ruimte zijn in jullie samenzijn.",
    "category": "Relationships",
    "source": "纪伯伦 / Kahlil Gibran · The Prophet《先知》 · 1923",
    "reference": {
      "author": "纪伯伦 / Kahlil Gibran",
      "work": "The Prophet《先知》",
      "date": "1923",
      "locator": "On Marriage〈论婚姻〉",
      "url": "https://www.gutenberg.org/cache/epub/58585/pg58585-images.html",
      "sourceType": "散文诗",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "这首散文诗把共同生活与各自生长并置，谈的是亲密关系中不被吞没的个体。",
      "question": "我们靠得很近时，还给彼此留了呼吸的空间吗？",
      "verification": "已核对作品全文；该书原作即为英语。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-008",
    "zh": "君子和而不同。",
    "en": "A noble person lives in harmony without demanding sameness.",
    "nl": "Een edel mens zoekt harmonie, zonder te eisen dat iedereen hetzelfde is.",
    "category": "Relationships",
    "source": "孔子言论，弟子及后学编纂 / Confucius and later compilers · 《论语·子路》 · 先秦；具体编纂年份未定",
    "reference": {
      "author": "孔子言论，弟子及后学编纂 / Confucius and later compilers",
      "work": "《论语·子路》",
      "date": "先秦；具体编纂年份未定",
      "locator": "13.23；摘录前半句",
      "url": "https://ctext.org/analects/zi-lu/ens",
      "sourceType": "古籍",
      "originalLanguage": "古汉语",
      "chineseStatus": "古籍原文，转简体",
      "englishStatus": "本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "全句把真正的和谐与表面的一致区分开来。相处并不必以相同的判断、喜好或身份为前提。",
      "question": "我是在寻求理解，还是在要求对方变得和我一样？",
      "verification": "已核对篇章与原句；英文是本次翻译，不沿用网站中的历史英译。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-009",
    "zh": "温柔，是爱最谦逊的形式。",
    "en": "Tenderness is the most modest form of love.",
    "nl": "Tederheid is de meest bescheiden vorm van liefde.",
    "category": "Relationships",
    "source": "奥尔加·托卡尔丘克 / Olga Tokarczuk · The Tender Narrator《温柔的讲述者》，诺贝尔文学奖演讲 · 2019-12-07",
    "reference": {
      "author": "奥尔加·托卡尔丘克 / Olga Tokarczuk",
      "work": "The Tender Narrator《温柔的讲述者》，诺贝尔文学奖演讲",
      "date": "2019-12-07",
      "locator": "英文演讲稿后部；PDF 第 24 页",
      "url": "https://www.nobelprize.org/uploads/2019/12/tokarczuk-lecture-english.pdf",
      "sourceType": "演讲",
      "originalLanguage": "波兰语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "诺贝尔官网英译，Jennifer Croft 与 Antonia Lloyd-Jones 译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "她所说的温柔，是认真看见另一种生命的脆弱与独特，而不只是温和的语气。",
      "question": "我最近一次认真看见别人的脆弱，是什么时候？",
      "verification": "已核对诺贝尔官网英文译稿；2018 是奖项年度，2019 才是演讲年份。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-010",
    "zh": "一本书应当是一把斧头，劈开我们内心冰封的海。",
    "en": "A book must be the axe for the frozen sea within us.",
    "nl": "Een boek moet de bijl zijn voor de bevroren zee in ons.",
    "category": "Reading",
    "source": "弗兰茨·卡夫卡 / Franz Kafka · 致 Oskar Pollak 的信 · 1904-01-27",
    "reference": {
      "author": "弗兰茨·卡夫卡 / Franz Kafka",
      "work": "致 Oskar Pollak 的信",
      "date": "1904-01-27",
      "locator": "布拉格，1904 年 1 月 27 日书信",
      "url": "https://www.literatpro.de/prosa/161116/an-oskar-pollak-prag-27-januar-1904-mittwoch",
      "sourceType": "书信",
      "originalLanguage": "德语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "本次据德文翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "ein Buch muß die Axt sein für das gefrorene Meer in uns.",
      "context": "卡夫卡谈的是能够唤醒、震动读者的书。这里的阅读不仅提供慰藉，也可能打破原有的生活感受。",
      "question": "最近哪本书，真正动摇了我原先的想法？",
      "verification": "德文书信转录已核对，并有学术出版交叉印证；该链接不是手稿扫描。中英文均为本次翻译。",
      "additionalSources": [
        {
          "label": "学术出版中的书信引用",
          "url": "https://www.transcript-verlag.de/media/pdf/13/96/50/oa9783839472088.pdf"
        }
      ]
    }
  },
  {
    "id": "curated-mgl-011",
    "zh": "写作时，你是在试着发现自己尚不知道的东西。",
    "en": "you’re trying to find out something which you don’t know.",
    "nl": "Als je schrijft, probeer je iets te ontdekken dat je nog niet weet.",
    "category": "Reading",
    "source": "詹姆斯·鲍德温 / James Baldwin · The Art of Fiction No. 78；Jordan Elgrably 访谈 · 1984 年春",
    "reference": {
      "author": "詹姆斯·鲍德温 / James Baldwin",
      "work": "The Art of Fiction No. 78；Jordan Elgrably 访谈",
      "date": "1984 年春",
      "locator": "The Paris Review，第 91 期；谈写作与布道的区别",
      "url": "https://www.theparisreview.org/interviews/2994/the-art-of-fiction-no-78-james-baldwin",
      "sourceType": "访谈",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文；补出原句的写作语境",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "访谈把写作与已经掌握答案的说教区分开来。写作也可以是认识过程，而不只是表达已有观点。",
      "question": "如果写作不为证明我知道什么，我会去探索什么？",
      "verification": "已核对原刊访谈及期号；日期为发表时间，不推定采访当天。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-012",
    "zh": "对我来说，它带来的感受是这样的。",
    "en": "This is the way it feels to me.",
    "nl": "Zo voelt het voor mij.",
    "category": "Reading",
    "source": "石黑一雄 / Kazuo Ishiguro · My Twentieth Century Evening—and Other Small Breakthroughs，诺贝尔文学奖演讲 · 2017-12-07",
    "reference": {
      "author": "石黑一雄 / Kazuo Ishiguro",
      "work": "My Twentieth Century Evening—and Other Small Breakthroughs，诺贝尔文学奖演讲",
      "date": "2017-12-07",
      "locator": "谈一位作者与一位读者之间的沟通",
      "url": "https://www.nobelprize.org/prizes/literature/2017/ishiguro/lecture/",
      "sourceType": "演讲",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "演讲用这句话模拟作者向读者传达感受：不是强迫对方接受一个结论，而是邀请对方理解一种体验。",
      "question": "我想分享的，是一个结论，还是一种值得被理解的感受？",
      "verification": "已核对官方演讲稿；这是一句演讲中的拟想表达，不是另一场访谈的回答。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-013",
    "zh": "我的经验，取决于我选择把注意力放在哪里。",
    "en": "My experience is what I agree to attend to.",
    "nl": "Mijn ervaring is datgene waaraan ik mijn aandacht wil schenken.",
    "category": "Attention",
    "source": "威廉·詹姆斯 / William James · The Principles of Psychology《心理学原理》 · 1890",
    "reference": {
      "author": "威廉·詹姆斯 / William James",
      "work": "The Principles of Psychology《心理学原理》",
      "date": "1890",
      "locator": "第 XI 章 Attention，开篇",
      "url": "https://psychclassics.yorku.ca/James/Principles/prin11.htm",
      "sourceType": "书籍",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "这一章讨论注意的选择性。它并非说外部现实由个人意念创造，而是说我们实际经历到什么，受到注意力的筛选。",
      "question": "今天占据我注意力的，真是我想经历的生活吗？",
      "verification": "已核对约克大学心理学经典档案中的原书章节。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-014",
    "zh": "信息的富足，造成了注意力的贫乏。",
    "en": "a wealth of information creates a poverty of attention",
    "nl": "Een overvloed aan informatie schept een tekort aan aandacht.",
    "category": "Attention",
    "source": "赫伯特·西蒙 / Herbert A. Simon · Designing Organizations for an Information-Rich World · 1971 年出版；可核对草稿署 1969-09-01",
    "reference": {
      "author": "赫伯特·西蒙 / Herbert A. Simon",
      "work": "Designing Organizations for an Information-Rich World",
      "date": "1971 年出版；可核对草稿署 1969-09-01",
      "locator": "草稿论述信息如何消耗接收者注意力的段落",
      "url": "https://iiif.library.cmu.edu/file/Simon_box00055_fld04178_bdl0002_doc0001/Simon_box00055_fld04178_bdl0002_doc0001.pdf",
      "sourceType": "论文；作者草稿",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "西蒙从组织的信息分配问题出发指出：信息增加时，接收者的有限注意力会成为稀缺资源。",
      "question": "我需要更多信息，还是更少、更值得注意的信息？",
      "verification": "原句在卡内基梅隆大学保存的作者草稿中核对；正式收于 Martin Greenberger 编 Computers, Communications, and the Public Interest，1971。",
      "additionalSources": [
        {
          "label": "卡内基梅隆大学出版相关档案",
          "url": "https://digitalcollections.library.cmu.edu/node/45427"
        },
        {
          "label": "作者著作目录：1971 年文集收录信息",
          "url": "https://iiif.library.cmu.edu/file/Simon_box00066_fld05048_bdl0002_doc0001/Simon_box00066_fld05048_bdl0002_doc0001.pdf"
        }
      ]
    }
  },
  {
    "id": "curated-mgl-015",
    "zh": "自由需要注意、觉察、自律与努力。",
    "en": "freedom involves attention, and awareness, and discipline, and effort",
    "nl": "Vrijheid vraagt om aandacht, bewustzijn, discipline en inspanning.",
    "category": "Attention",
    "source": "大卫·福斯特·华莱士 / David Foster Wallace · This Is Water，Kenyon College 毕业演讲 · 2005",
    "reference": {
      "author": "大卫·福斯特·华莱士 / David Foster Wallace",
      "work": "This Is Water，Kenyon College 毕业演讲",
      "date": "2005",
      "locator": "演讲后部：真正有价值的自由",
      "url": "https://www.kenyon.edu/news/archive/this-is-water/",
      "sourceType": "演讲",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "这里的自由包括在平凡而令人烦躁的日常里，仍能主动理解和关心他人。",
      "question": "当日常让人烦躁时，我有没有选择另一种看待别人的方式？",
      "verification": "已核对学校保存的演讲全文；英文为句中连续摘录。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-016",
    "zh": "灵感诞生于不断说出的“我不知道”。",
    "en": "it’s born from a continuous ‘I don’t know.’",
    "nl": "Inspiratie ontstaat uit een voortdurend ‘ik weet het niet’.",
    "category": "Uncertainty",
    "source": "维斯瓦娃·辛波斯卡 / Wisława Szymborska · The Poet and the World《诗人与世界》，诺贝尔文学奖演讲 · 1996-12-07",
    "reference": {
      "author": "维斯瓦娃·辛波斯卡 / Wisława Szymborska",
      "work": "The Poet and the World《诗人与世界》，诺贝尔文学奖演讲",
      "date": "1996-12-07",
      "locator": "谈灵感与持续追问的段落",
      "url": "https://www.nobelprize.org/prizes/literature/1996/szymborska/lecture/",
      "sourceType": "演讲",
      "originalLanguage": "波兰语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "诺贝尔官网英文译稿，连续摘录",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "演讲不仅谈诗人，也谈教师、医生、园丁等人对工作的好奇。不确定性在这里是继续探索的空间。",
      "question": "什么问题，我已经太快地认定自己知道答案？",
      "verification": "已核对诺贝尔官网英文译稿；中文补出英文代词所指的 inspiration，未增添新主张。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-017",
    "zh": "我们必须保持谦逊，允许自己有所不知。",
    "en": "we must remain modest and allow that we do not know.",
    "nl": "We moeten bescheiden blijven en erkennen dat we het niet weten.",
    "category": "Uncertainty",
    "source": "理查德·费曼 / Richard P. Feynman · The Relation of Science and Religion，Caltech YMCA 午餐论坛演讲 · 1956-05-02",
    "reference": {
      "author": "理查德·费曼 / Richard P. Feynman",
      "work": "The Relation of Science and Religion，Caltech YMCA 午餐论坛演讲",
      "date": "1956-05-02",
      "locator": "关于科学与不确定性的讨论",
      "url": "https://calteches.library.caltech.edu/1640/1/Religion.pdf",
      "sourceType": "演讲",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "费曼讨论科学认识中的怀疑与开放。承认未知不意味着所有判断同样可靠，而是保留修正判断的可能。",
      "question": "我有没有把暂时的理解，误当成最终答案？",
      "verification": "已核对加州理工学院档案中的演讲发表文本与日期。",
      "additionalSources": [
        {
          "label": "加州理工学院档案记录",
          "url": "https://calteches.library.caltech.edu/1640/"
        }
      ]
    }
  },
  {
    "id": "curated-mgl-018",
    "zh": "有些事在我们的掌控之中，有些则不在。",
    "en": "Some things are in our control and others not.",
    "nl": "Sommige dingen hebben we in de hand, andere niet.",
    "category": "Uncertainty",
    "source": "爱比克泰德 / Epictetus；阿里安整理 · Enchiridion《手册》 · 约公元 2 世纪",
    "reference": {
      "author": "爱比克泰德 / Epictetus；阿里安整理",
      "work": "Enchiridion《手册》",
      "date": "约公元 2 世纪",
      "locator": "第 1 章，开篇",
      "url": "https://classics.mit.edu/Epictetus/epicench.html",
      "sourceType": "古典哲学",
      "originalLanguage": "古希腊语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "Elizabeth Carter 历史英译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "开篇区分自己的判断与行动，以及名声等外部结果。这种区分可以帮助投入行动，不是放弃责任的借口。",
      "question": "这件事里，我能负责的部分究竟是什么？",
      "verification": "已核对 MIT Classics Archive 所载 Elizabeth Carter 英译；作品原语为希腊语，年代只标约数。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-019",
    "zh": "此刻，先把这些问题活出来。",
    "en": "Live the questions now.",
    "nl": "Leef nu de vragen.",
    "category": "Time",
    "source": "赖纳·马利亚·里尔克 / Rainer Maria Rilke · 致 Franz Xaver Kappus 的信；后收入《给一个青年诗人的十封信》 · 1903-07-16",
    "reference": {
      "author": "赖纳·马利亚·里尔克 / Rainer Maria Rilke",
      "work": "致 Franz Xaver Kappus 的信；后收入《给一个青年诗人的十封信》",
      "date": "1903-07-16",
      "locator": "Worpswede bei Bremen，1903 年 7 月 16 日书信",
      "url": "https://www.rilke.de/briefe/160703.htm",
      "sourceType": "书信",
      "originalLanguage": "德语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "本次据德文翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "Leben Sie jetzt die Fragen.",
      "context": "里尔克劝青年对尚未解决的问题保持耐心：有些答案需要在生活中逐渐变得可经验，而不是立即得到一句解释。",
      "question": "我能否让一个重要的问题，多陪伴自己一段时间？",
      "verification": "已核对德文书信日期与原句；中英文为本次据德文翻译，不冒充既有出版译本。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-020",
    "zh": "自其不变者而观之，则物与我皆无尽也。",
    "en": "Viewed through what does not change, both the world and I are without end.",
    "nl": "Vanuit wat onveranderlijk is bekeken, zijn zowel de wereld als ikzelf zonder einde.",
    "category": "Time",
    "source": "苏轼 / Su Shi · 《前赤壁赋》 · 1082；宋神宗元丰五年",
    "reference": {
      "author": "苏轼 / Su Shi",
      "work": "《前赤壁赋》",
      "date": "1082；宋神宗元丰五年",
      "locator": "江水、明月与变／不变的对话",
      "url": "https://ctext.org/wiki.pl?chapter=949408&if=en",
      "sourceType": "赋",
      "originalLanguage": "古汉语",
      "chineseStatus": "古籍原文，转简体",
      "englishStatus": "本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "这句话与从变化角度观察世界的上一句相对。它尝试改变观看生命的尺度，不是主张个体肉身不会死亡。",
      "question": "一件事的得失，会不会随着观察的尺度改变？",
      "verification": "已核对古籍转录中的句子，并用年谱核对写作年份；保留『物与我』，不沿用其他页面的识别错字。",
      "additionalSources": [
        {
          "label": "《东坡先生年谱》：元丰五年",
          "url": "https://ctext.org/wiki.pl?chapter=506252&if=gb"
        }
      ]
    }
  },
  {
    "id": "curated-mgl-021",
    "zh": "当我们不断推迟，生命正飞快流逝。",
    "en": "While we are postponing, life speeds by.",
    "nl": "Terwijl we uitstellen, snelt het leven voorbij.",
    "category": "Time",
    "source": "塞涅卡 / Seneca · Moral Letters to Lucilius《致卢基利乌斯道德书简》 · 公元 1 世纪；所核对英文为 1925 年重印本转录",
    "reference": {
      "author": "塞涅卡 / Seneca",
      "work": "Moral Letters to Lucilius《致卢基利乌斯道德书简》",
      "date": "公元 1 世纪；所核对英文为 1925 年重印本转录",
      "locator": "第 1 封信，第 2 节",
      "url": "https://en.wikisource.org/wiki/Moral_letters_to_Lucilius/Letter_1",
      "sourceType": "书信",
      "originalLanguage": "拉丁语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "Richard Mott Gummere 历史英译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "第一封信劝读者看顾自己的时间：可以补回钱财，却很难取回已经交出去的生命。",
      "question": "我把什么一直留给一个并不存在的『以后』？",
      "verification": "已在维基文库对应书信正文核对 Richard Mott Gummere 英译；总目录所载版本为 1925 年重印本，不把译本年份当成原作年份。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-022",
    "zh": "知道，远不如感受重要。",
    "en": "It is not half so important to know as to feel.",
    "nl": "Weten is nog niet half zo belangrijk als voelen.",
    "category": "Nature",
    "source": "蕾切尔·卡森 / Rachel Carson · The Sense of Wonder《惊奇之心》；前身为 Help Your Child to Wonder · 1965 年成书；相关文章发表于 1956 年",
    "reference": {
      "author": "蕾切尔·卡森 / Rachel Carson",
      "work": "The Sense of Wonder《惊奇之心》；前身为 Help Your Child to Wonder",
      "date": "1965 年成书；相关文章发表于 1956 年",
      "locator": "关于儿童自然教育的段落",
      "url": "https://www.fws.gov/sites/default/files/documents/Compass_to_Nature_teaching_in_the_outdoor_classroom.pdf",
      "sourceType": "书籍；机构教学资料摘引",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "卡森在谈儿童如何与自然建立关系。这里的感受，是好奇与喜爱能够成为学习的起点，不是笼统否定事实和知识。",
      "question": "我最近一次不急着解释、只是感受自然，是什么时候？",
      "verification": "短句在美国鱼类及野生动物管理局教学资料的书籍摘引中核对；未核定 1965 年版页码，也未把此句首次出现年份断言为 1956。",
      "additionalSources": [
        {
          "label": "1956 年原文扫描与刊期说明",
          "url": "https://www.fws.gov/media/help-your-child-wonder"
        }
      ]
    }
  },
  {
    "id": "curated-mgl-023",
    "zh": "那就是这里，就是家，就是我们。",
    "en": "That’s here. That’s home. That’s us.",
    "nl": "Dat is hier. Dat is thuis. Dat zijn wij.",
    "category": "Nature",
    "source": "卡尔·萨根 / Carl Sagan · Pale Blue Dot: A Vision of the Human Future in Space《暗淡蓝点》 · 1994",
    "reference": {
      "author": "卡尔·萨根 / Carl Sagan",
      "work": "Pale Blue Dot: A Vision of the Human Future in Space《暗淡蓝点》",
      "date": "1994",
      "locator": "对 Voyager 1『暗淡蓝点』照片的文字回应",
      "url": "https://science.nasa.gov/mission/voyager/voyager-1s-pale-blue-dot/",
      "sourceType": "书籍；NASA 摘录",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "这是从遥远视角观看地球时的提醒：所有人的生活与争执，都发生在这一个极小的共同家园上。",
      "question": "从更远的地方看，我眼前的争执还会有多大？",
      "verification": "已核对 NASA 摘录；照片拍于 1990 年，所引书籍出版于 1994 年，二者未混用。",
      "additionalSources": [
        {
          "label": "1994 年出版信息",
          "url": "https://books.google.com/books/about/Pale_Blue_Dot.html?id=mW_vAAAAMAAJ"
        }
      ]
    }
  },
  {
    "id": "curated-mgl-024",
    "zh": "是世界之美救了我。",
    "en": "I got saved by the beauty of the world.",
    "nl": "De schoonheid van de wereld heeft me gered.",
    "category": "Nature",
    "source": "玛丽·奥利弗 / Mary Oliver · On Being，Krista Tippett 访谈 · 2015-02-05 首播",
    "reference": {
      "author": "玛丽·奥利弗 / Mary Oliver",
      "work": "On Being，Krista Tippett 访谈",
      "date": "2015-02-05 首播",
      "locator": "谈童年、自然与诗歌的访谈",
      "url": "https://onbeing.org/programs/mary-oliver-i-got-saved-by-the-beauty-of-the-world/",
      "sourceType": "访谈",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "奥利弗回顾自己的童年经历，以及走进自然给她的支撑。这是她个人的经验，不是对所有痛苦的一项保证。",
      "question": "有没有一种微小的美，曾在某个时刻接住了我？",
      "verification": "已核对官方音频节目页及逐字稿；网页 2022 年更新／再发布不当作首次访谈年份。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-025",
    "zh": "没有门、锁或门闩，能封住我思想的自由。",
    "en": "there is no gate, no lock, no bolt that you can set upon the freedom of my mind.",
    "nl": "Geen poort, slot of grendel kan de vrijheid van mijn geest afsluiten.",
    "category": "Creativity",
    "source": "弗吉尼亚·伍尔夫 / Virginia Woolf · A Room of One’s Own《一间自己的房间》 · 1929",
    "reference": {
      "author": "弗吉尼亚·伍尔夫 / Virginia Woolf",
      "work": "A Room of One’s Own《一间自己的房间》",
      "date": "1929",
      "locator": "第 4 章；Hogarth 初版印刷页 114",
      "url": "https://en.wikisource.org/wiki/Page%3AA_Room_of_One%27s_Own_%28Hogarth_1929%29.djvu/118",
      "sourceType": "随笔",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "伍尔夫讨论女性写作的物质条件与精神自主。这句来自随笔中的叙述声音，不应脱离它所回应的排斥与限制。",
      "question": "我有没有在别人开口之前，就先限制了自己的表达？",
      "verification": "已核对 1929 年初版扫描页；同时可与弗吉尼亚大学转录交叉阅读。",
      "additionalSources": [
        {
          "label": "弗吉尼亚大学作品转录与版本说明",
          "url": "https://anthologydev.lib.virginia.edu/work/Woolf/woolf-room-of-ones-own?section=frontMatter"
        }
      ]
    }
  },
  {
    "id": "curated-mgl-026",
    "zh": "任何人间的权力，都可以被人抵抗与改变。",
    "en": "Any human power can be resisted and changed by human beings.",
    "nl": "Elke menselijke macht kan door mensen worden weerstaan en veranderd.",
    "category": "Creativity",
    "source": "厄休拉·勒古恩 / Ursula K. Le Guin · National Book Foundation Medal 获奖致辞 · 2014-11-19",
    "reference": {
      "author": "厄休拉·勒古恩 / Ursula K. Le Guin",
      "work": "National Book Foundation Medal 获奖致辞",
      "date": "2014-11-19",
      "locator": "谈艺术、出版商业与改变的可能",
      "url": "https://www.ursulakleguin.com/nbf-medal",
      "sourceType": "演讲",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "她在出版行业的颁奖礼上讨论商业权力，并强调艺术与想象能够帮助人看见现状之外的可能。",
      "question": "我把哪些人为形成的规则，当成了不可改变的自然规律？",
      "verification": "已核对作者官网保存的致辞全文；日期为颁奖致辞日期。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-027",
    "zh": "我们终会死去……但我们创造并运用语言。",
    "en": "We die. … But we do language.",
    "nl": "We sterven… maar we scheppen en gebruiken taal.",
    "category": "Creativity",
    "source": "托妮·莫里森 / Toni Morrison · 诺贝尔文学奖演讲 · 1993-12-07",
    "reference": {
      "author": "托妮·莫里森 / Toni Morrison",
      "work": "诺贝尔文学奖演讲",
      "date": "1993-12-07",
      "locator": "谈语言与生命的段落",
      "url": "https://www.nobelprize.org/prizes/literature/1993/morrison/lecture/",
      "sourceType": "演讲",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "英语原文，非连续短摘录；省略处已标示",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "演讲讨论语言可以伤害，也可以让经验获得表达。这里关注的不只是作品是否传世，而是我们如何承担使用语言的责任。",
      "question": "我使用的语言，是打开了别人的世界，还是把它关上？",
      "verification": "已核对官方全文；省略号明确表示非连续摘录。『创造并运用』是对 do language 的本次译法。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-028",
    "zh": "你自己，是最容易被你欺骗的人。",
    "en": "you are the easiest person to fool.",
    "nl": "Jijzelf bent degene die je het gemakkelijkst voor de gek houdt.",
    "category": "Wisdom",
    "source": "理查德·费曼 / Richard P. Feynman · Cargo Cult Science，加州理工学院毕业演讲 · 1974",
    "reference": {
      "author": "理查德·费曼 / Richard P. Feynman",
      "work": "Cargo Cult Science，加州理工学院毕业演讲",
      "date": "1974",
      "locator": "谈科学诚信、避免自欺的段落",
      "url": "https://magazine.caltech.edu/post/feynman-at-100",
      "sourceType": "演讲；校方转载",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "费曼要求研究者认真呈现可能推翻自己结论的证据。这比简单地要求别人相信自己，更接近诚实。",
      "question": "如果我的判断是错的，什么证据能让我承认？",
      "verification": "已核对加州理工学院 2018 年转载所载的 1974 年演讲文本；不把转载年份标成演讲年份。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-029",
    "zh": "人有不为也，而后可以有为。",
    "en": "There are things one will not do; only then can one act.",
    "nl": "Pas als je besluit wat je niet doet, kun je handelen.",
    "category": "Wisdom",
    "source": "孟子及其后学 / Mencius and later compilers · 《孟子·离娄下》 · 先秦；具体编纂年份未定",
    "reference": {
      "author": "孟子及其后学 / Mencius and later compilers",
      "work": "《孟子·离娄下》",
      "date": "先秦；具体编纂年份未定",
      "locator": "〈离娄下〉",
      "url": "https://ctext.org/text.pl?if=en&node=24998",
      "sourceType": "古籍",
      "originalLanguage": "古汉语",
      "chineseStatus": "古籍原文，转简体",
      "englishStatus": "本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "原文所谈有道德上的选择与界限，不只是少做几件事以提高效率。明确不愿做什么，也能让行动更有方向。",
      "question": "我希望守住的底线，真的进入了我的选择吗？",
      "verification": "已核对古籍原句；不将现代时间管理式扩写冒充孟子原话。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-030",
    "zh": "先为不可胜，以待敌之可胜。",
    "en": "First make yourself secure against defeat; then wait for the opponent’s vulnerability.",
    "nl": "Zorg eerst dat je niet verslagen kunt worden; wacht dan tot je tegenstander kwetsbaar wordt.",
    "category": "The Art of War",
    "source": "传统署名孙武 / Sun Tzu · 《孙子兵法·军形篇》 · 先秦；具体成书年份未定",
    "reference": {
      "author": "传统署名孙武 / Sun Tzu",
      "work": "《孙子兵法·军形篇》",
      "date": "先秦；具体成书年份未定",
      "locator": "〈军形篇〉，开篇",
      "url": "https://ctext.org/art-of-war/tactical-dispositions/zh",
      "sourceType": "古籍",
      "originalLanguage": "古汉语",
      "chineseStatus": "古籍原文，转简体",
      "englishStatus": "本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "原文首先是军事论述。把它用于日常决策时，可以启发我们先检查自身风险，再等待机会；这是编辑延伸，不是原文另有一句人生格言。",
      "question": "我在追逐机会之前，是否先看清了自己的脆弱之处？",
      "verification": "已核对古籍原句；这是专题候选，上线前仍应与网站孙子专题内部条目核对是否重复。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-031",
    "zh": "一件东西的代价，是你必须用来交换它的那一部分生命，无论当下还是日后。",
    "en": "the cost of a thing is the amount of what I will call life which is required to be exchanged for it, immediately or in the long run.",
    "nl": "De prijs van iets is het deel van je leven dat je ervoor moet inruilen, nu of op de lange duur.",
    "category": "Life",
    "source": "亨利·戴维·梭罗 / Henry David Thoreau · Walden《瓦尔登湖》 · 1854",
    "reference": {
      "author": "亨利·戴维·梭罗 / Henry David Thoreau",
      "work": "Walden《瓦尔登湖》",
      "date": "1854",
      "locator": "Economy〈经济〉；讨论住房成本的段落",
      "url": "https://www.gutenberg.org/files/205/205-h/205-h.htm",
      "sourceType": "随笔／书籍",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "梭罗把金钱成本重新换算为劳动与生命时间。这让『买得起』和『值得付出』成为两个不同的问题。",
      "question": "我为这件东西付出的，除了钱，还有多少生命？",
      "verification": "已核对作品全文；英文为连续摘录，省去句首连接语。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-032",
    "zh": "我们在想象中受的苦，常比现实中的更多。",
    "en": "we suffer more often in imagination than in reality.",
    "nl": "We lijden vaker in onze verbeelding dan in werkelijkheid.",
    "category": "Life",
    "source": "塞涅卡 / Seneca · Moral Letters to Lucilius《致卢基利乌斯道德书简》 · 公元 1 世纪；所核对英文为 1925 年重印本转录",
    "reference": {
      "author": "塞涅卡 / Seneca",
      "work": "Moral Letters to Lucilius《致卢基利乌斯道德书简》",
      "date": "公元 1 世纪；所核对英文为 1925 年重印本转录",
      "locator": "第 13 封信，第 4 节",
      "url": "https://en.wikisource.org/wiki/Moral_letters_to_Lucilius/Letter_13",
      "sourceType": "书信",
      "originalLanguage": "拉丁语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "Richard Mott Gummere 历史英译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "这封信谈尚未发生的祸事，以及预先让自己困在恐惧里。它并不否定真实发生的困难。",
      "question": "让我疲惫的，是眼前的事实，还是脑中反复预演的可能？",
      "verification": "已在维基文库第 13 封信第 4 节核对；英文采用 Richard Mott Gummere 历史译文，总目录所载版本为 1925 年重印本。",
      "additionalSources": [
        {
          "label": "第 13 封信在线阅读；含其他现代译写，不整体沿用",
          "url": "https://www.lettersfromastoic.net/letter-13-on-groundless-fears/"
        }
      ]
    }
  },
  {
    "id": "curated-mgl-033",
    "zh": "过去能帮助现在吗？逝者能拯救生者吗？",
    "en": "Can the past help the present? Can the dead save the living?",
    "nl": "Kan het verleden het heden helpen? Kunnen de doden de levenden redden?",
    "category": "Life",
    "source": "韩江 / Han Kang · Light and Thread《光与线》，诺贝尔文学奖演讲 · 2024",
    "reference": {
      "author": "韩江 / Han Kang",
      "work": "Light and Thread《光与线》，诺贝尔文学奖演讲",
      "date": "2024",
      "locator": "英文 PDF 第 6 页；回顾《少年来了》的写作",
      "url": "https://www.nobelprize.org/uploads/2024/12/han-lecture-english.pdf",
      "sourceType": "演讲",
      "originalLanguage": "韩语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "诺贝尔官网英文译稿",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "这两个问题与她书写光州历史的经历相连：过去留下的勇气、伤痛与尊严，如何进入今天的生命。",
      "question": "我从过去继承的，不只有伤痛，还能有什么？",
      "verification": "已核对诺贝尔官网英文译稿；没有把问题改写为作者给出的确定结论。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-034",
    "zh": "因为是他，因为是我。",
    "en": "because it was he, because it was I.",
    "nl": "Omdat hij het was, omdat ik het was.",
    "category": "Relationships",
    "source": "米歇尔·德·蒙田 / Michel de Montaigne · Essays《随笔》，第一卷〈论友谊〉 · 16 世纪；《随笔》1580 年起出版并后续修订",
    "reference": {
      "author": "米歇尔·德·蒙田 / Michel de Montaigne",
      "work": "Essays《随笔》，第一卷〈论友谊〉",
      "date": "16 世纪；《随笔》1580 年起出版并后续修订",
      "locator": "〈论友谊〉；不同版本章节编号有差异",
      "url": "https://www.gutenberg.org/files/3600/3600-h/3600-h",
      "sourceType": "随笔",
      "originalLanguage": "法语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "Charles Cotton 历史英译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "蒙田在这里回顾与 Étienne de La Boétie 的友谊，尝试说明某种关系为何难以用一张理由清单解释。",
      "question": "有没有一个人，其重要性无法被『优点』清单说尽？",
      "verification": "已核对 Charles Cotton 历史英译；本句首次出现于哪次修订未核定，因此不将其精确标为 1580 年原句。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-035",
    "zh": "天堂既在我们头顶，也在我们脚下。",
    "en": "Heaven is under our feet as well as over our heads.",
    "nl": "De hemel ligt evenzeer onder onze voeten als boven ons hoofd.",
    "category": "Nature",
    "source": "亨利·戴维·梭罗 / Henry David Thoreau · Walden《瓦尔登湖》 · 1854",
    "reference": {
      "author": "亨利·戴维·梭罗 / Henry David Thoreau",
      "work": "Walden《瓦尔登湖》",
      "date": "1854",
      "locator": "The Pond in Winter〈冬天的湖〉",
      "url": "https://www.gutenberg.org/files/205/205-h/205-h.htm",
      "sourceType": "随笔／书籍",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "这句出现在冬季湖泊的观察中。它把值得敬畏的美，从遥远的天空带回近处、脚下与日常世界。",
      "question": "我是不是一直望向远方，却忽略了已经在脚下的美？",
      "verification": "已核对作品全文中的章节与句子。",
      "additionalSources": []
    }
  },
  {
    "id": "curated-mgl-036",
    "zh": "我并不认为答案只有一个。",
    "en": "I don’t really think there is one answer",
    "nl": "Ik geloof niet echt dat er maar één antwoord is.",
    "category": "Self",
    "source": "厄休拉·勒古恩 / Ursula K. Le Guin · The Art of Fiction No. 221；John Wray 访谈 · 2013 年秋",
    "reference": {
      "author": "厄休拉·勒古恩 / Ursula K. Le Guin",
      "work": "The Art of Fiction No. 221；John Wray 访谈",
      "date": "2013 年秋",
      "locator": "The Paris Review，第 206 期；谈宗教探索",
      "url": "https://www.theparisreview.org/interviews/6253/the-art-of-fiction-no-221-ursula-k-le-guin",
      "sourceType": "访谈",
      "originalLanguage": "英语",
      "chineseStatus": "本次译文（中文古籍除外）",
      "englishStatus": "来源中的英文摘录；另有注明者为本次翻译",
      "dutchStatus": "荷兰文为本次据原文或所核对英译翻译。",
      "originalText": "",
      "context": "她在回答宗教探索的问题时谈到对不同思想的兴趣。不要把这句泛化为『所有事实都没有确定答案』。",
      "question": "关于怎样生活，我是否太急着寻找唯一正确的模板？",
      "verification": "已核对原刊访谈及期号；日期为发表时间。",
      "additionalSources": []
    }
  }
];

// Append without changing the IDs or ordering of the original notes.
baseQuotes.push(...sourcedNotes.filter((quote) => quote.category !== "The Art of War"));


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
const founderEntry = document.querySelector("#founderEntry");
const founderModal = document.querySelector("#founderModal");
const founderForm = document.querySelector("#founderForm");
const founderPassword = document.querySelector("#founderPassword");
const founderPasswordToggle = document.querySelector("#founderPasswordToggle");
const founderStatus = document.querySelector("#founderStatus");
const founderClose = document.querySelector("#founderClose");
const founderCancel = document.querySelector("#founderCancel");
const privateLabsEntry = document.querySelector("#privateLabsEntry");
const privateLabsModal = document.querySelector("#privateLabsModal");
const privateLabsClose = document.querySelector("#privateLabsClose");

let activeCategory = "";
let collectionMode = "category";
let activeProofreadIndex = null;
const visitorCounterEndpoint = "https://notes-garden-counter.cindyxin518.workers.dev";
const jobAgentEndpoint = "https://minigrow-job-agent.cindyxin518.workers.dev";
const founderSessionKey = "founderJobAgentSession";

function isPrivateAccessAttempt(text) {
  const value = String(text || "").trim();
  return value.length >= 8 && value.length <= 160 && !/\s/.test(value) && /[-_\d]/.test(value);
}

function isBlockedVisitorNote(quote) {
  const values = [quote?.zh, quote?.en, quote?.nl, quote?.source]
    .filter(Boolean)
    .map((value) => String(value).trim().toLowerCase());
  return values.some((value) => isPrivateAccessAttempt(value));
}

function removeBlockedLocalVisitorNotes() {
  const nextUserQuotes = userQuotes.filter((quote) => !isBlockedVisitorNote(quote));
  if (nextUserQuotes.length !== userQuotes.length) {
    userQuotes = nextUserQuotes;
    localStorage.setItem("userQuotes", JSON.stringify(userQuotes));
  }
}

function prepareStoredQuote(quote, index, prefix) {
  return {
    ...quote,
    id: quote.id || `${prefix}-${index}`,
    nl: quote.nl || "",
    source: quote.source || "Visitor submission"
  };
}

function rebuildQuotes() {
  removeBlockedLocalVisitorNotes();
  publicVisitorQuotes = publicVisitorQuotes.filter((quote) => !isBlockedVisitorNote(quote));
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
  { id: artOfWarThemeId, label: "Sun Tzu’s Strategy" },
  { id: "Wisdom", label: "Wisdom" },
  { id: "Self", label: "Self" },
  { id: "Growth", label: "Growth" },
  { id: "Life", label: "Life" },
  { id: "Relationships", label: "Relationships" },
  { id: "Reading", label: "Reading" },
  { id: "Others", label: "Others" },
  { id: "Attention", label: "Attention" },
  { id: "Uncertainty", label: "Uncertainty" },
  { id: "Time", label: "Time" },
  { id: "Nature", label: "Nature" },
  { id: "Creativity", label: "Creativity" }
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
const sourcedStrategyNote = sourcedNotes.find((quote) => quote.category === artOfWarThemeId);
if (sourcedStrategyNote) {
  artOfWarSections[0].notes.push({
    ...sourcedStrategyNote,
    background: "This line opens the Tactical Dispositions chapter of The Art of War. It first concerns military preparation: protect against defeat before relying on an opportunity to win. The precise date of the text is uncertain; the source records the chapter rather than assigning an unsupported year.",
    reality: "An editorial application to everyday decisions: before chasing an opportunity, examine your own exposure and prepare what is within your control. What vulnerability would you want to address first? This modern application is not another quotation from Sun Tzu."
  });
}

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

async function togglePublicLikeById(id, liked) {
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

async function togglePublicLike(index, liked) {
  return togglePublicLikeById(quoteKey(index), liked);
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
    .map((group, index) => {
      const number = String(index + 1).padStart(2, "0");
      if (group.id === artOfWarThemeId) {
        return `
          <a class="category-card category-card-special" href="#collection/art-of-war">
            <span class="category-index">${number}</span>
            <strong>${escapeHtml(group.label)}</strong>
            <span>Special notes on strategy, judgment, resources, information, leadership, and decisions.</span>
            <em>Featured collection</em>
          </a>
        `;
      }
      const groupQuotes = quotes.filter((quote) => groupForQuote(quote) === group.id);
      const sample = groupQuotes[0];
      return `
        <a class="category-card" href="#category/${encodeURIComponent(group.id)}">
          <span class="category-index">${number}</span>
          <strong>${escapeHtml(group.label)}</strong>
          <span>${groupQuotes.length} notes${sample ? ` · ${escapeHtml(sample.en || sample.zh)}` : ""}</span>
          <em>Open collection</em>
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

function getReactionById(id, key) {
  return Boolean(reactions[id]?.[key]);
}

function getReactionCountById(id, key) {
  return reactionCounts[id]?.[key] || 0;
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

function getPopularityScoreById(id) {
  const counts = reactionCounts[id] || {};
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

const likeIconPath = '<path d="M7 10v11M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3l3.7-6.6A2 2 0 0 1 14.42 4a2 2 0 0 1 .58 1.88Z" />';

function reactionButtonForId(id, key, label, iconPath) {
  const active = getReactionById(id, key);
  const count = getReactionCountById(id, key);
  return `
    <button class="reaction-btn ${active ? "is-active" : ""}" type="button" data-reaction="${key}" data-reaction-id="${escapeHtml(id)}" aria-label="${label}">
      <svg viewBox="0 0 24 24" aria-hidden="true">${iconPath}</svg>
      <span>${label}</span>
      <span>${count}</span>
    </button>
  `;
}

function reactionButton(index, key, label, iconPath) {
  return reactionButtonForId(quoteKey(index), key, label, iconPath);
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

function safeSourceUrl(value) {
  try {
    const url = new URL(String(value));
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function sourceNotes(quote) {
  const reference = quote.reference;
  if (!reference) return "";
  const url = safeSourceUrl(reference.url);
  if (!url) return "";
  const additionalSources = (reference.additionalSources || [])
    .map((source) => ({ ...source, url: safeSourceUrl(source.url) }))
    .filter((source) => source.url)
    .map((source) => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a></li>`)
    .join("");
  return `
    <div class="quote-source">
      <p class="citation-author">${escapeHtml(reference.author)}</p>
      <p class="citation-work"><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(reference.work)}</a></p>
      <p class="citation-date">${escapeHtml(reference.date)}</p>
      <details class="citation-details">
        <summary>Context &amp; source notes</summary>
        <div class="citation-copy">
          <h4>Context · 编辑说明</h4>
          <p>${escapeHtml(reference.context)}</p>
          <h4>A question to keep · 编辑提问</h4>
          <p>${escapeHtml(reference.question)}</p>
          <dl>
            <dt>Source &amp; location</dt>
            <dd>${escapeHtml(reference.sourceType)} · ${escapeHtml(reference.locator)}</dd>
            <dt>Original language &amp; translations</dt>
            <dd>${escapeHtml(reference.originalLanguage)}<br>${escapeHtml(reference.chineseStatus)}<br>${escapeHtml(reference.englishStatus)}<br>${escapeHtml(reference.dutchStatus)}</dd>
            ${reference.originalText ? `<dt>Source-language excerpt</dt><dd>${escapeHtml(reference.originalText)}</dd>` : ""}
            <dt>Reference check</dt>
            <dd>${escapeHtml(reference.verification)}</dd>
          </dl>
          ${additionalSources ? `<h4>Additional references</h4><ul>${additionalSources}</ul>` : ""}
        </div>
      </details>
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
      ${sourceNotes(quote)}
      <div class="reader-actions" aria-label="Reader actions">
        ${reactionButton(index, "like", "Like", likeIconPath)}
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
      return normalize(`${quote.zh || ""}${quote.en || ""}${quote.nl || ""}${categoryLabel(quote.category)}${quote.category}${quote.source}`).includes(keyword);
    });
}

function artPopularCard(entry) {
  const { section, note, sectionIndex, noteIndex, id } = entry;
  return `
    <article class="quote-card strategy-popular-card">
      <div class="quote-body">
        <p class="quote-text quote-zh">${escapeHtml(note.zh)}</p>
        <p class="quote-text quote-en">${escapeHtml(note.en)}</p>
        <p class="quote-nl"><span>Sun Tzu’s Strategy</span>${escapeHtml(section.title)}</p>
      </div>
      ${sourceNotes(note)}
      <div class="reader-actions" aria-label="Reader actions">
        ${reactionButtonForId(id, "like", "Like", likeIconPath)}
        <a class="strategy-detail-btn" href="#collection/art-of-war/${sectionIndex}/${noteIndex}/background">Background</a>
        <a class="strategy-detail-btn" href="#collection/art-of-war/${sectionIndex}/${noteIndex}/reality">Reality Link</a>
      </div>
    </article>
  `;
}

function renderQuotes() {
  const visibleQuotes = getVisibleQuotes();
  if (collectionMode === "popular") {
    const quoteItems = visibleQuotes.map(({ quote, index }) => ({
      score: getPopularityScore(index),
      html: quoteCard(quote, index)
    }));
    const artItems = getArtOfWarNoteEntries()
      .filter((entry) => getPopularityScoreById(entry.id) > 0)
      .map((entry) => ({
        score: getPopularityScoreById(entry.id),
        html: artPopularCard(entry)
      }));
    const items = [...quoteItems, ...artItems].sort((a, b) => b.score - a.score);
    quoteGrid.innerHTML = items.map((item) => item.html).join("");
    resultCount.textContent = `Showing ${items.length} notes`;
    emptyState.classList.toggle("is-visible", items.length === 0);
    return;
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

function artNoteKey(sectionIndex, noteIndex) {
  return `art-${sectionIndex}-${noteIndex}`;
}

function getArtOfWarNote(sectionIndex, noteIndex) {
  const section = artOfWarSections[Number(sectionIndex)];
  const note = section?.notes[Number(noteIndex)];
  if (!section || !note) return null;
  return { section, note, sectionIndex: Number(sectionIndex), noteIndex: Number(noteIndex) };
}

function getArtOfWarNoteEntries() {
  return artOfWarSections.flatMap((section, sectionIndex) => {
    return section.notes.map((note, noteIndex) => ({
      section,
      note,
      sectionIndex,
      noteIndex,
      id: artNoteKey(sectionIndex, noteIndex)
    }));
  });
}

function artOfWarSectionCard(section, sectionIndex) {
  const notes = section.notes
    .map((note, noteIndex) => `
      <li class="strategy-note">
        <strong>${escapeHtml(note.zh)}</strong>
        <em>${escapeHtml(note.en)}</em>
        ${note.nl ? `<p class="quote-text quote-nl"><span>Dutch</span>${escapeHtml(note.nl)}</p>` : ""}
        ${sourceNotes(note)}
        <div class="strategy-note-actions" aria-label="Sun Tzu’s Strategy note details">
          ${reactionButtonForId(artNoteKey(sectionIndex, noteIndex), "like", "Like", likeIconPath)}
          <a class="strategy-detail-btn" href="#collection/art-of-war/${sectionIndex}/${noteIndex}/background">Background</a>
          <a class="strategy-detail-btn" href="#collection/art-of-war/${sectionIndex}/${noteIndex}/reality">Reality Link</a>
        </div>
      </li>
    `)
    .join("");

  return `
    <article class="strategy-card">
      <span>Sun Tzu’s Strategy</span>
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
      <a class="back-link strategy-back-link" href="#collection/art-of-war">Back to Sun Tzu’s Strategy</a>
      <p class="eyebrow">${escapeHtml(section.title)}</p>
      <h3>${escapeHtml(note.zh)}</h3>
      <p class="strategy-detail-translation">${escapeHtml(note.en)}</p>
      ${note.nl ? `<p class="quote-text quote-nl"><span>Dutch</span>${escapeHtml(note.nl)}</p>` : ""}
      ${sourceNotes(note)}
      <div class="reader-actions strategy-detail-reactions" aria-label="Reader actions">
        ${reactionButtonForId(artNoteKey(sectionIndex, noteIndex), "like", "Like", likeIconPath)}
      </div>
      <div class="strategy-note-actions strategy-detail-tabs" aria-label="Switch Sun Tzu’s Strategy detail">
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
  const key = button.dataset.reaction;
  const index = button.dataset.index;
  const id = button.dataset.reactionId || quoteKey(index);
  const nextValue = !reactions[id]?.[key];
  try {
    await togglePublicLikeById(id, nextValue);
  } catch (error) {
    const nextCount = nextValue
      ? getReactionCountById(id, key) + 1
      : Math.max(0, getReactionCountById(id, key) - 1);
    reactions[id] = { ...(reactions[id] || {}), [key]: nextValue };
    reactionCounts[id] = {
      ...(reactionCounts[id] || {}),
      [key]: nextCount
    };
  }
  saveFavorites();
  updateStats();
  route();
});

function closeProofreadDialog() {
  proofreadModal.hidden = true;
  activeProofreadIndex = null;
  proofreadText.value = "";
}

async function unlockFounderMode(password) {
  const response = await fetch(`${jobAgentEndpoint}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.token) {
    throw new Error(data.error || "Password was not accepted.");
  }
  localStorage.setItem(founderSessionKey, data.token);
  window.location.href = "admin/job-agent.html";
}

function openFounderDialog() {
  if (!founderModal || !founderPassword || !founderStatus) return;
  founderStatus.textContent = "";
  founderPassword.value = "";
  founderPassword.type = "password";
  if (founderPasswordToggle) {
    founderPasswordToggle.classList.remove("is-visible");
    founderPasswordToggle.setAttribute("aria-label", "Show password");
    founderPasswordToggle.setAttribute("aria-pressed", "false");
  }
  founderModal.hidden = false;
  founderPassword.focus();
}

function closeFounderDialog() {
  if (!founderModal || !founderPassword || !founderStatus) return;
  founderModal.hidden = true;
  founderPassword.value = "";
  founderPassword.type = "password";
  if (founderPasswordToggle) {
    founderPasswordToggle.classList.remove("is-visible");
    founderPasswordToggle.setAttribute("aria-label", "Show password");
    founderPasswordToggle.setAttribute("aria-pressed", "false");
  }
  founderStatus.textContent = "";
}

function openPrivateLabs() {
  if (!privateLabsModal) return;
  privateLabsModal.hidden = false;
  document.body.classList.add("modal-open");
  privateLabsClose?.focus();
}

function closePrivateLabs() {
  if (!privateLabsModal) return;
  privateLabsModal.hidden = true;
  document.body.classList.remove("modal-open");
  privateLabsEntry?.focus();
}

async function handleFounderPassword(password, statusTarget) {
  const value = String(password || "").trim();
  if (!value) return false;
  if (statusTarget) statusTarget.textContent = "Checking...";
  try {
    await unlockFounderMode(value);
    return true;
  } catch {
    if (statusTarget) statusTarget.textContent = "Private access was not accepted.";
    return false;
  }
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
  if (event.key === "Escape" && founderModal && !founderModal.hidden) {
    closeFounderDialog();
  }
  if (event.key === "Escape" && privateLabsModal && !privateLabsModal.hidden) {
    closePrivateLabs();
  }
});

if (privateLabsEntry) privateLabsEntry.addEventListener("click", openPrivateLabs);
if (privateLabsClose) privateLabsClose.addEventListener("click", closePrivateLabs);
if (privateLabsModal) privateLabsModal.addEventListener("click", (event) => {
  if (event.target === privateLabsModal) closePrivateLabs();
});

const statsBand = document.querySelector(".stats-band");
if (statsBand) statsBand.addEventListener("click", (event) => {
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

if (founderEntry) founderEntry.addEventListener("click", openFounderDialog);

if (founderPasswordToggle) founderPasswordToggle.addEventListener("click", () => {
  const shouldShow = founderPassword.type === "password";
  founderPassword.type = shouldShow ? "text" : "password";
  founderPasswordToggle.classList.toggle("is-visible", shouldShow);
  founderPasswordToggle.setAttribute("aria-label", shouldShow ? "Hide password" : "Show password");
  founderPasswordToggle.setAttribute("aria-pressed", String(shouldShow));
  founderPassword.focus();
});

if (founderForm) founderForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const accepted = await handleFounderPassword(founderPassword.value, founderStatus);
  founderPassword.value = "";
  if (!accepted) founderPassword.focus();
});

if (founderClose) founderClose.addEventListener("click", closeFounderDialog);
if (founderCancel) founderCancel.addEventListener("click", closeFounderDialog);
if (founderModal) founderModal.addEventListener("click", (event) => {
  if (event.target === founderModal) closeFounderDialog();
});

contributeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = newText.value.trim();
  const english = newEnglish.value.trim();

  if (!text) {
    contributeStatus.textContent = "Please add note text.";
    return;
  }

  if (isPrivateAccessAttempt(text)) {
    const accepted = await handleFounderPassword(text, contributeStatus);
    newText.value = "";
    if (accepted) {
      return;
    }
    newText.focus();
    return;
  }

  const quote = {
    id: `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    zh: text,
    en: english,
    nl: "",
    category: newTheme.value,
    source: newSource.value.trim() || "Visitor submission",
    language: "Preferred language"
  };

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
  document.title = "MiniGrowLab - Notes Garden";
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
  collectionTitle.textContent = "Sun Tzu’s Strategy";
  document.title = "Sun Tzu’s Strategy | Notes Garden";
  collectionNote.innerHTML = "<strong>Inspired by The Art of War</strong><span>Explore timeless strategic thinking: how to read situations, make better decisions, and solve conflicts with wisdom rather than force.</span>";
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
  collectionTitle.textContent = artDetailLabels[detailType] || "Sun Tzu’s Strategy";
  document.title = `${collectionTitle.textContent} | Sun Tzu’s Strategy | Notes Garden`;
  collectionNote.textContent = "Inspired by The Art of War. A closer reading of one strategy note.";
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

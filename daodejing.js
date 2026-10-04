// Classical text: the received Wang Bi edition; translations and applications are editorial.
const daoDeJingSource = "https://zh.wikisource.org/wiki/道德經_(王弼本)";
const daoDeJingSections = [
  {
    title: "道与自然 · The Way & Naturalness",
    detail: "Language, the limits of certainty, and allowing things to be themselves.",
    notes: [
      {
        chapter: 1, chapterTitle: "一章",
        zh: "道可道，非常道；名可名，非常名。",
        en: "The way that can be spoken is not the enduring Way; the name that can be named is not the enduring name.",
        nl: "De weg die kan worden uitgesproken is niet de blijvende Weg; de naam die kan worden benoemd is niet de blijvende naam.",
        background: {
          zh: "第一章以道与名开篇，提醒读者：能够说出、命名的事物，不等于道的全部。这里的“常”涉及恒常；不同版本与译法对这句话有不同理解，本条不把其中一种解读当作唯一答案。",
          en: "The opening chapter distinguishes the Way from what language can name. A useful reading is that a description does not exhaust what it describes. The meaning of the enduring or constant Way remains a matter of interpretation; this is not a rejection of all language."
        },
        reality: {
          zh: "在工作或关系里，“失败者”“成功”“好员工”等标签可能遮住真实的人与情境。可以暂时使用分类，但别让分类替代观察。问问自己：我是不是把一个方便的名字，误当成了全部事实？",
          en: "Labels such as success, failure, or a good employee can hide a person's circumstances. Use categories as tools, not as the whole truth. What might your current description be leaving out? This is a modern reflection, not a further quotation from Laozi."
        },
        question: "我正在使用的标签，遮住了哪些真实细节？"
      },
      {
        chapter: 25, chapterTitle: "二十五章",
        zh: "人法地，地法天，天法道，道法自然。",
        en: "People follow earth; earth follows heaven; heaven follows the Way; the Way follows what is so of itself.",
        nl: "De mens volgt de aarde; de aarde volgt de hemel; de hemel volgt de Weg; de Weg volgt wat vanzelf zo is.",
        background: {
          zh: "第二十五章把人放在地、天、道的关系中。“自然”在这里不只是现代意义上的山川草木，也有“自己如此、自然而然”的意思。它提示一种不以人的意愿强行规定一切的观看方式。",
          en: "Chapter 25 places human life in relation to earth, heaven, and the Way. Ziran here means being so of itself, not simply the modern idea of the natural environment. The passage invites attention to how things develop without being forced into our preferred form."
        },
        reality: {
          zh: "带团队、养植物或学习新技能，都需要观察对象本身的条件和节奏。支持成长未必等于加大控制。尊重规律也不意味着接受不公；可以改变条件，而不是要求所有人长成同一种样子。",
          en: "A team, a plant, and a new skill each have their own conditions and rhythms. Support development by understanding those conditions. Respecting a process does not mean accepting injustice or refusing to improve the environment."
        },
        question: "我是在支持它的成长，还是在强迫它符合我的想象？"
      },
      {
        chapter: 40, chapterTitle: "四十章",
        zh: "反者道之动，弱者道之用。",
        en: "Returning is the movement of the Way; yielding is how the Way works.",
        nl: "Terugkeren is de beweging van de Weg; meegeven is hoe de Weg werkt.",
        background: {
          zh: "第四十章用极短的篇幅谈道的运动与作用。“反”可以理解为返回或反转，“弱”则与柔弱相连。它把变化看作并非只有向外扩张、持续增强这一条方向。",
          en: "This short chapter describes the Way through returning or reversal and through weakness or yielding. It challenges the assumption that movement must always mean outward expansion and greater force. The terms admit more than one interpretation."
        },
        reality: {
          zh: "当计划越做越复杂时，回到最初的问题、删去多余环节，可能比继续加码更有帮助。退一步整理方向，不必被理解为失败；但这也不是“所有退步都会带来成功”的保证。",
          en: "When a project grows complicated, returning to its original purpose can be more useful than adding another layer. A pause or simplification need not be a failure. It is not a promise that every reversal will produce success."
        },
        question: "此刻真正需要的，是更多推进，还是一次回到根本？"
      }
    ]
  },
  {
    title: "无为与治理 · Non-forcing & Leadership",
    detail: "Creating conditions for action without excessive interference or claiming every result.",
    notes: [
      {
        chapter: 2, chapterTitle: "二章",
        zh: "是以圣人处无为之事，行不言之教。",
        en: "Thus the sage attends to affairs without forcing and teaches without words.",
        nl: "Zo handelt de wijze zonder te forceren en onderwijst zonder woorden.",
        background: {
          zh: "第二章先谈有无、难易等相互依存的关系，再写圣人的做法，随后强调生而不有、功成不居。“无为”不是简单的什么都不做；本条将它理解为减少强作、占有和过度干预。",
          en: "After describing paired qualities, chapter 2 turns to a sage who does not possess what is produced or take permanent credit for achievement. Here nonaction is read as non-forcing, not literal inactivity. The chapter connects conduct with restraint rather than constant assertion."
        },
        reality: {
          zh: "有些教导通过稳定的行为比通过反复说教更有效。领导者可以清楚设定边界、提供资源，再用自己的做法建立标准。减少干预不等于缺席，更不等于对伤害或失职不作处理。",
          en: "Consistent conduct can teach more than repeated instructions. Set clear boundaries and provide resources, then demonstrate the standard yourself. Less interference is not absence, and it does not excuse ignoring harm or neglect."
        },
        question: "我希望别人学会的东西，我自己的行为已经展示了吗？"
      },
      {
        chapter: 17, chapterTitle: "十七章",
        zh: "功成事遂，百姓皆谓：我自然。",
        en: "When the work is done and affairs are accomplished, the people all say: we did it of ourselves.",
        nl: "Als het werk voltooid is, zegt het volk: wij hebben het zelf gedaan.",
        background: {
          zh: "第十七章比较不同的治理状态：有的统治者仅被知道存在，有的被亲近赞美，有的被畏惧或轻侮。结尾用百姓“我自然”的声音，呈现一种不把成就全部归于统治者的治理理想。",
          en: "Chapter 17 contrasts rulers who are barely known, praised, feared, or despised. Its closing voice belongs to the people, who experience the outcome as their own doing. This is a political ideal in the text, not a documented account of a particular ruler."
        },
        reality: {
          zh: "一个团队顺利完成任务后，如果成员感觉“我们做到了”，而不只是“老板救了我们”，往往说明能力与主动权确实留在团队里。可以让贡献被看见，同时不把每次成果都变成领导者的个人故事。",
          en: "After a team succeeds, do people feel that they achieved it, or that the leader rescued them? Build capacity and agency within the group. Recognize contributions without turning every result into the leader's personal story."
        },
        question: "我正在建立别人的能力，还是建立别人对我的依赖？"
      },
      {
        chapter: 37, chapterTitle: "三十七章",
        zh: "道常无为而无不为。",
        en: "The Way is ever without forcing, yet nothing is left undone.",
        nl: "De Weg forceert nooit, en toch blijft niets ongedaan.",
        background: {
          zh: "第三十七章从道的无为谈到侯王守道、万物自化以及欲望兴起时的处置。这句话放在治理语境里，强调并非只有持续施加意志，事物才会变化；它不是无条件的效率承诺。",
          en: "Chapter 37 connects the Way's nonaction with rulers, spontaneous transformation, and the restraint of desire. Change is not presented as depending solely on imposed will. Nothing left undone should not be read as an unconditional promise of effortless productivity."
        },
        reality: {
          zh: "反复催促可能不如修复一个真正的障碍：模糊的职责、不足的信息、无法使用的工具。先改善条件，再让人自主行动。该负责的工作仍然要做，只是不必把忙碌本身当作价值。",
          en: "Remove a genuine obstacle, such as unclear roles or unusable tools, before adding another reminder. Improve the conditions for people to act. Necessary work still matters; activity alone is not evidence of value."
        },
        question: "如果我停止一项干预，事情会变坏，还是反而更顺畅？"
      }
    ]
  },
  {
    title: "水与柔韧 · Water & Resilience",
    detail: "Water as an image of care, adaptability, and strength without domination.",
    notes: [
      {
        chapter: 8, chapterTitle: "八章",
        zh: "上善若水。水善利万物而不争。",
        en: "The highest goodness is like water. Water benefits all things without contending.",
        nl: "De hoogste goedheid is als water. Water helpt alle dingen zonder te wedijveren.",
        background: {
          zh: "第八章借水说明善：有益于万物而不争，并处在众人不愿处的位置。后文继续谈居处、内心、言语、行动与时机。水是这一章的思想意象，不是一则需要补写人物情节的历史故事。",
          en: "Chapter 8 uses water as an image of goodness: it benefits things, avoids contention, and takes low places. The chapter then addresses dwelling, the heart, speech, work, and timing. Water is an image in the text, not a historical anecdote."
        },
        reality: {
          zh: "在合作中，可以关注“什么对这件事有帮助”，而不是“谁显得更重要”。不争功与维护边界可以同时成立；像水一样提供支持，不代表任由别人侵占时间、尊严或利益。",
          en: "In cooperation, ask what helps the shared work rather than who appears most important. Generosity and clear boundaries can coexist. Supporting others does not require surrendering your time, dignity, or legitimate interests."
        },
        question: "如果不需要证明我更重要，我会怎样帮助眼前这件事？"
      },
      {
        chapter: 43, chapterTitle: "四十三章",
        zh: "天下之至柔，驰骋天下之至坚。",
        en: "The softest thing under heaven moves through the hardest thing under heaven.",
        nl: "Het zachtste onder de hemel beweegt door het hardste onder de hemel.",
        background: {
          zh: "第四十三章把至柔与至坚放在一起，接着谈无有入无间、无为之益与不言之教。它以反差说明：有效的作用未必来自最强硬、最可见的力量。",
          en: "Chapter 43 contrasts softness with hardness, then connects this with nonaction and teaching without words. Its paradox suggests that effective influence need not take the form of the most forceful or conspicuous intervention."
        },
        reality: {
          zh: "僵住的对话未必能靠更大音量打开。一个准确的问题、一段认真倾听，可能比继续争辩更有用。这里的柔是方法上的灵活，不是放弃判断，更不是要求受伤害的人继续忍耐。",
          en: "A stuck conversation may respond better to an accurate question or careful listening than to a louder argument. Softness can mean flexibility of method, not surrender of judgment. It is not an instruction to endure mistreatment."
        },
        question: "我能否换一种更柔和、但仍然清楚有力的方式？"
      },
      {
        chapter: 78, chapterTitle: "七十八章",
        zh: "天下莫柔弱于水，而攻坚强者，莫之能胜。",
        en: "Nothing under heaven is softer or weaker than water, yet nothing surpasses it in working against the hard and strong.",
        nl: "Niets onder de hemel is zachter of zwakker dan water, maar niets overtreft het tegenover het harde en sterke.",
        background: {
          zh: "第七十八章再次写水，并接着指出柔弱胜刚强的道理虽广为人知，却很少被实行。后文还涉及承担国家的垢与不祥；本条保留水的意象，但不把全章缩减为一条个人励志口号。",
          en: "Chapter 78 returns to water and notes that the victory of softness over hardness is widely known but difficult to practise. It also discusses a ruler's willingness to bear a state's burdens. The full chapter is broader than a personal motivational slogan."
        },
        reality: {
          zh: "面对长期难题，能够调整路径、持续反馈，可能比一次猛烈用力更重要。练习、协商或组织改变都需要耐心，但应当检查进展与代价；柔韧不是无限坚持一条已经失效的路线。",
          en: "A long-term problem may reward adaptation and sustained feedback more than one intense push. Practise patiently, but keep checking progress and cost. Resilience is not endless persistence with a method that no longer works."
        },
        question: "怎样既保持方向，又给方法留下改变的空间？"
      }
    ]
  },
  {
    title: "知足与取舍 · Enough & Letting Go",
    detail: "Limits, proportion, and knowing when achievement no longer needs more possession.",
    notes: [
      {
        chapter: 9, chapterTitle: "九章",
        zh: "功遂身退，天之道。",
        en: "When the work is accomplished, step back: this is the way of heaven.",
        nl: "Als het werk voltooid is, treed dan terug: zo gaat de weg van de hemel.",
        background: {
          zh: "第九章先写过满、过锐、财富与骄傲的风险，最后以功遂身退收束。这里依所核对的王弼本保留“功遂”用字，而不直接换成常见的成语“功成身退”。",
          en: "Chapter 9 warns about overfilling, over-sharpening, possessions, and pride, before closing with withdrawal after accomplishment. The Chinese follows the checked Wang Bi text's wording gong sui rather than silently replacing it with the later familiar idiom gong cheng."
        },
        reality: {
          zh: "项目完成后，可以让成果交接、经验留存，再结束已经完成的角色。停止追加自己的存在感，不等于抛弃责任。先把交接做好，再问：我是否还在紧抓一件已经不需要我控制的事？",
          en: "After a project is finished, hand over the result and preserve what others need to continue. Stepping back is not abandonment: fulfil your responsibilities first. Then ask whether you are holding on to control that the work no longer needs."
        },
        question: "我能否让成果留下，而不要求自己的位置永远留下？"
      },
      {
        chapter: 44, chapterTitle: "四十四章",
        zh: "知足不辱，知止不殆，可以长久。",
        en: "Knowing enough avoids humiliation; knowing when to stop avoids danger. This makes endurance possible.",
        nl: "Weten wat genoeg is voorkomt vernedering; weten wanneer te stoppen voorkomt gevaar. Zo kun je duurzaam voortgaan.",
        background: {
          zh: "第四十四章先比较名声、身体、财货，以及获得与失去的代价，然后提出知足、知止。它关心的不只是得到多少，也包括为得到这些东西，是否损伤了更根本的生活。",
          en: "Chapter 44 compares reputation, one's life, possessions, and the cost of gaining and losing. Knowing enough and knowing when to stop follow these questions. The focus is not merely the size of a gain but what is put at risk to obtain it."
        },
        reality: {
          zh: "给工作时长、消费或一个项目设定停止条件，可以保护比眼前奖励更重要的东西。知足不等于拒绝进步，而是先界定：什么已足够，什么代价不能继续支付？",
          en: "Define stopping conditions for work, consumption, or a project before rewards make them hard to see. Enough does not mean rejecting improvement. It means deciding which costs you are no longer willing to pay."
        },
        question: "如果继续追求更多，我正在用什么来交换？"
      },
      {
        chapter: 46, chapterTitle: "四十六章",
        zh: "故知足之足，常足矣。",
        en: "Thus the sufficiency that comes from knowing enough is enduring sufficiency.",
        nl: "De voldoening die voortkomt uit weten wat genoeg is, is blijvende voldoening.",
        background: {
          zh: "第四十六章从天下有道、无道时马匹的用途变化谈起，随后批评不知足与欲得。这一句处在和平、战争和欲望的语境中，并不是要否认贫困或现实资源的不足。",
          en: "Chapter 46 begins with horses returning to farming in an ordered world and warhorses appearing when the Way is absent. Its closing thought about enough follows a criticism of acquisitive desire. It does not erase poverty or genuine material need."
        },
        reality: {
          zh: "可以把“真正缺少的资源”与“因为比较而觉得不够”分开。前者值得努力改善，后者则可能永远没有终点。记录已经够用的部分，能帮助把注意力留给真正重要的需求。",
          en: "Distinguish a real shortage of resources from a sense of lack created by comparison. Improve the former; question the endless finish line of the latter. Notice what is already sufficient without dismissing needs that remain unmet."
        },
        question: "我觉得不够，是因为真实需要，还是因为参照对象又变了？"
      }
    ]
  },
  {
    title: "修身与明智 · Self-knowledge & Care",
    detail: "Turning attention inward, listening beyond fixed preferences, and speaking with restraint.",
    notes: [
      {
        chapter: 33, chapterTitle: "三十三章",
        zh: "知人者智，自知者明。胜人者有力，自胜者强。",
        en: "Knowing others is wisdom; knowing yourself is clarity. Overcoming others takes force; overcoming yourself is strength.",
        nl: "Anderen kennen is wijsheid; jezelf kennen is helderheid. Anderen overwinnen vraagt kracht; jezelf overwinnen is ware sterkte.",
        background: {
          zh: "第三十三章依次比较知人与自知、胜人与自胜，接着谈知足、有志与长久。这里把强与明的尺度从外部胜负转向自身，提醒读者不要只用压过别人来判断能力。",
          en: "Chapter 33 contrasts knowing others with knowing oneself, and defeating others with overcoming oneself. It then turns to enough, purpose, and endurance. The standard of strength shifts away from external victory alone."
        },
        reality: {
          zh: "别人哪里做得不好，往往比自己的防御、冲动和盲点更容易看见。一次诚实的自我观察，可以从一个具体习惯开始：在被质疑时，我能否先理解，再反击？自省也不意味着把所有责任归给自己。",
          en: "Other people's faults are often easier to see than our own defensive habits. Begin with one concrete pattern, such as the urge to counterattack when questioned. Self-knowledge should not become the belief that every problem is your fault."
        },
        question: "我最常要求别人改变的事，自己是否也在重复？"
      },
      {
        chapter: 49, chapterTitle: "四十九章",
        zh: "圣人无常心，以百姓心为心。",
        en: "The sage has no fixed heart of their own, but takes the people's hearts as their heart.",
        nl: "De wijze houdt niet vast aan een eigen onveranderlijk hart, maar neemt de harten van het volk als het eigen hart.",
        background: {
          zh: "第四十九章从圣人与百姓的关系出发，随后谈对善与不善、信与不信者的回应。“无常心”在这里不是善变，而是可以理解为不把自身固着的意愿当成唯一尺度。",
          en: "Chapter 49 places the sage in relation to the people, then considers responses to those who are good or not good, trustworthy or not trustworthy. Having no fixed heart can be read as not making one's own settled preferences the sole measure of others."
        },
        reality: {
          zh: "设计产品、管理团队或处理家庭分歧时，可以先听见当事人的需要，而不是立即给出“为你好”的答案。倾听不等于放弃事实与边界；它让决定不只围绕做决定的人展开。",
          en: "Before deciding what is best for a customer, colleague, or family member, hear the needs of the person affected. Listening does not suspend evidence or boundaries. It prevents a decision from revolving only around the decision-maker."
        },
        question: "我理解的是对方的需要，还是我替对方想象的需要？"
      },
      {
        chapter: 56, chapterTitle: "五十六章",
        zh: "知者不言，言者不知。",
        en: "Those who know do not speak; those who speak do not know.",
        nl: "Wie weet, spreekt niet; wie spreekt, weet niet.",
        background: {
          zh: "第五十六章用这组强烈对句开头，随后谈收敛、解纷、和光同尘与玄同。把它放回全章，更适合读作对夸示、纷争和强作的警惕，而不是“所有开口的人都无知”的通用规则。",
          en: "Chapter 56 begins with this sharp contrast and then describes restraint, the easing of entanglement, and sharing the dust. In that setting it can be read as a warning against display and contention, not a universal claim that everyone who speaks is ignorant."
        },
        reality: {
          zh: "开口前停一下，分辨自己是在澄清问题，还是在证明懂得更多。必要的信息仍应清楚表达，专业意见也值得听取；这句不应被用来要求人沉默、压制异议或逃避解释责任。",
          en: "Before speaking, distinguish clarifying a problem from displaying superiority. Necessary information and expert advice still deserve expression. This line should not be used to silence disagreement or avoid the duty to explain."
        },
        question: "我现在想说的话，是帮助理解，还是展示自己？"
      }
    ]
  },
  {
    title: "留白与起步 · Space & Small Beginnings",
    detail: "The usefulness of what is absent, attending to small things, and beginning where you stand.",
    notes: [
      {
        chapter: 11, chapterTitle: "十一章",
        zh: "故有之以为利，无之以为用。",
        en: "What is present provides benefit; what is absent makes use possible.",
        nl: "Wat aanwezig is biedt voordeel; wat afwezig is maakt gebruik mogelijk.",
        background: {
          zh: "第十一章以车轮的毂、陶器和房间为例：材料提供形体，空处让它们能被使用。这里的“无”不是简单的毫无价值，而是通过器物的留空，说明有与无共同构成功用。",
          en: "Chapter 11 uses a wheel hub, a vessel, and a room to show how open space makes an object usable. Absence is not presented as mere worthlessness. The examples connect what is present with the space that permits its function."
        },
        reality: {
          zh: "日程里的空白、界面里的间距、对话里的停顿，都可能不是浪费，而是让真正重要的事情有地方发生。留白也有条件：不是删掉必要资源，而是减少已经妨碍使用的填满。",
          en: "An open hour, space in an interface, or a pause in conversation can make useful activity possible. This is not a reason to remove essential resources. Ask whether filling every available space has begun to prevent its intended use."
        },
        question: "哪里需要的不是更多内容，而是一点可以使用的空白？"
      },
      {
        chapter: 63, chapterTitle: "六十三章",
        zh: "图难于其易，为大于其细。",
        en: "Address the difficult while it is easy; undertake the great while it is small.",
        nl: "Pak het moeilijke aan terwijl het nog gemakkelijk is; begin het grote terwijl het nog klein is.",
        background: {
          zh: "第六十三章紧接着说天下难事、大事分别起于易与细，又警惕轻诺与把事情看得太容易。它不是承诺大事轻松完成，而是把认真对待细小开端与承认难度放在一起。",
          en: "Chapter 63 says that difficult and great affairs begin in what is easy and small. It also warns against casual promises and treating matters too lightly. Attention to small beginnings is paired with respect for difficulty, not a guarantee that large tasks will be effortless."
        },
        reality: {
          zh: "在问题还小的时候澄清一个误会、修复一个流程，通常比等它变成危机更容易。项目也可以先找到一个可检验的小步骤。小并不意味着随便；认真正是在这时开始。",
          en: "Clarify a misunderstanding or repair a process before it becomes a crisis. For a project, choose a small step that can be tested. Small does not mean careless: it is where attention begins."
        },
        question: "这个大问题，现在可以从哪一个小而具体的动作开始？"
      },
      {
        chapter: 64, chapterTitle: "六十四章",
        zh: "合抱之木，生于毫末；九层之台，起于累土；千里之行，始于足下。",
        en: "A tree that fills an embrace grows from a tiny shoot; a nine-storey terrace rises from piled earth; a thousand-mile journey begins beneath your feet.",
        nl: "Een boom die je met beide armen omvat groeit uit een kleine scheut; een terras van negen verdiepingen begint met opgehoopte aarde; een reis van duizend mijl begint onder je voeten.",
        background: {
          zh: "第六十四章用树、台与行路的三个意象说明小处与大成之间的关系。全章也谈未乱时的治理、执着造成的失去，以及慎终如始；它不只鼓励开始，还提醒临近完成时仍须谨慎。",
          en: "Chapter 64 connects a tiny shoot, accumulated earth, and the ground beneath one's feet with larger outcomes. It also addresses prevention, the failures of grasping, and care at the end as at the beginning. The chapter asks for more than simply starting."
        },
        reality: {
          zh: "把一个遥远目标换成今天可以执行的动作，能让行动有落点。开始之后，也要记录反馈、调整方向，并认真完成最后的交接。第一步重要，但并不会自动替我们走完余下的路。",
          en: "Translate a distant goal into an action you can take today. After starting, gather feedback, adjust direction, and complete the final handover with care. The first step matters, but it does not automatically walk the rest of the road."
        },
        question: "我今天能走出的第一步是什么？又怎样把最后一步也做好？"
      }
    ]
  }
].map((section) => ({
  ...section,
  notes: section.notes.map((note) => ({
    ...note,
    id: `dao-chapter-${note.chapter}`,
    category: "Dao De Jing",
    source: `《道德经》第${note.chapter}章 · 王弼本`,
    reference: {
      author: "传统署名老子 / Traditionally attributed to Laozi",
      work: `《道德经》第${note.chapter}章 · 王弼本`,
      date: "先秦文本；具体作者与成书年代有争议",
      locator: `王弼本·${note.chapterTitle}；本站显示简体与现代标点`,
      url: `${daoDeJingSource}#${encodeURIComponent(note.chapterTitle)}`,
      sourceType: "古籍原文；维基文库所收王弼本",
      originalLanguage: "古汉语",
      chineseStatus: "古籍原句；转为简体，标点作现代整理。",
      englishStatus: "英文为本站据所核对中文原句编译，不是引用某一出版译本。",
      dutchStatus: "荷兰文为本站编译；翻译允许不同理解，欢迎校正。",
      originalText: "",
      context: note.background.zh,
      question: note.question,
      verification: "按所链接的王弼本章节核对原文。背景与现实联系是本站编辑解读，均不是古籍原文，也不是历史事件的记录。",
      additionalSources: [{
        label: "Stanford Encyclopedia of Philosophy：Laozi（作者、年代与主要概念）",
        url: "https://plato.stanford.edu/entries/laozi/"
      }]
    }
  }))
}));

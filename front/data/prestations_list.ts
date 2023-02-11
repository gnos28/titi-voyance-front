export type PrestationItem = {
  name: string;
  description: string;
  price: number;
  background: string;
  link: string;
  description_long: string;
  duration: number;
};

export const prestations_list: PrestationItem[] = [
  {
    name: "Question simple",
    description: "Je réponds à votre question",
    price: 5,
    background: "/cards/card07.webp",
    link: "question-simple",
    description_long:
      'Vous avez une question pressante et voulez une réponse rapide et abordable ? Optez pour la prestation "Question Simple". Pour seulement 5 euros, je vous offre une réponse à votre question en seulement 10 minutes\nQue ce soit pour des préoccupations professionnelles, sentimentales ou personnelles, je suis là pour vous aider. Avec mes années d\'expérience en cartomancie et en soins énergétiques, je mettrai mes dons à votre disposition pour vous fournir une réponse claire et précise.\nNe laissez plus votre incertitude vous ronger et obtenez la réponse que vous cherchez en seulement 10 minutes !\n\nPour une réponse précise à votre question, merci d\'apporter autant de précision que possible dans le champ "informations complémentaires" prévu à cet effet.\nPar exemple si cela concerne plusieurs personnes, indiquer leurs noms et leurs dates de naissance ou age, si vous recherchez du travail / amour : précisez depuis combien de temps.',
    // 'Question simple avec datation\nPour une réponse précise à votre question, merci d\'apporter autant de précision que possible dans le champ "informations complémentaires" prévu à cet effet.\nPar exemple :\nSi cela concerne plusieurs personne, indiquer leurs noms et leurs dates de naissance / age\nSi vous recherchez du travail / amour : depuis combien de temps ?\n\nLa réponse à votre tirage peut se faire de 3 façons :\n- Par téléphone, je vous appellerai selon le créneau fixé (me fournir votre numéro de téléphone)\n- Par instagram (me fournir votre pseudo instagram)\n- Par whatsapp, je vous appellerai selon le créneau fixé (me fournir votre numéro de téléphone)',
    duration: 10,
  },
  {
    name: "Tirage Général",
    description: "Plusieurs questions",
    price: 10,
    background: "/cards/card05.webp",
    link: "tirage-general",
    description_long:
      'Vous avez plusieurs questions en tête et souhaitez une réponse approfondie et abordable ? Optez pour notre prestation "Tirage Général". Pour seulement 10 euros, je vous offre une session de 30 minutes pour répondre à toutes vos questions.\nQue ce soit pour des préoccupations professionnelles, sentimentales ou personnelles, je suis là pour vous aider. Avec mes années d\'expérience en cartomancie et en soins énergétiques, je mettrai mes dons à votre disposition pour vous fournir une réponse claire et précise à chacune de vos interrogations.\nNe laissez plus votre incertitude vous ronger et obtenez les réponses que vous cherchez en seulement 30 minutes ! Pour une réponse précise à vos questions, n\'oubliez pas d\'apporter autant de précision que possible dans le champ "Informations complémentaires".\nVous pouvez me poser autant de questions que vous le souhaitez sur des sujets divers et variés, je suis là pour vous aider à explorer votre avenir et à comprendre votre chemin de vie.',

    // "Je vous éclaire sur votre avenir de manière générale avec plusieur oracles ou tarôts sur les thèmes suivants :\n- Sentimental\n- Travail / Finance\n- Relationnel / Familial\n\nLa guidance peut se faire de 3 façons :\n- Par téléphone, je vous appellerai selon le créneau fixé (me fournir votre numéro de téléphone)\n- Par instagram (me fournir votre pseudo instagram)\n- Par whatsapp, je vous appellerai selon le créneau fixé (me fournir votre numéro de téléphone)",
    duration: 30,
  },
  {
    name: "Guidance Générale",
    description: "Eclairage multi-thématiques",
    price: 20,
    background: "/cards/card01.webp",
    link: "guidance-generale",
    description_long:
      "Vous cherchez une vue d'ensemble sur votre avenir et comprendre les différents aspects de votre vie ? Je vous propose la prestation \"Guidance Générale\".\nDurant 60 minutes, je vais vous guider en utilisant mes compétences en cartomancie et en soins énergétiques, en utilisant plusieurs oracles et tarots pour vous offrir une compréhension complète de vos thèmes amoureux, professionnels, financiers et familiaux.\nObtenez une vision approfondie de votre avenir en découvrant comment chaque aspect de votre vie s'entrelace pour vous offrir un chemin de vie plus clair et plus épanouissant.\nPour une guidance encore plus précise, n'oubliez pas d'apporter autant de précision que possible dans le champ \"Informations complémentaires\". Tout cela pour seulement 20 euros ! N'attendez plus et obtenez la guidance dont vous avez besoin aujourd'hui.",

    // "Je vous éclaire sur votre avenir de manière générale avec plusieur oracles ou tarôts sur les thèmes suivants :\n- Sentimental\n- Travail / Finance\n- Relationnel / Familial\n\nLa guidance peut se faire de 3 façons :\n- Par téléphone, je vous appellerai selon le créneau fixé (me fournir votre numéro de téléphone)\n- Par instagram (me fournir votre pseudo instagram)\n- Par whatsapp, je vous appellerai selon le créneau fixé (me fournir votre numéro de téléphone)",
    duration: 60,
  },
  {
    name: "Lacher prise",
    description: "Faire la part des choses",
    price: 20,
    background: "/cards/card10.webp",
    link: "lacher-prise",
    description_long:
      'Vous ressentez le besoin de vous libérer de vos préoccupations et de vous recentrer sur vous-même ? La séance "Lâcher-prise" est faite pour vous.\nDurant 30 minutes, je vous accompagne pour vous aider à libérer votre esprit des stress et des inquiétudes qui vous pèsent au quotidien. En utilisant des techniques de soins énergétiques, je vous aide à retrouver votre paix intérieure et votre sérénité.\nCette séance est idéale pour ceux qui cherchent à mieux gérer leur stress, à améliorer leur bien-être mental et à retrouver un sentiment de contrôle sur leur vie.\nNe laissez plus les soucis quotidiens vous affecter. Prenez soin de vous avec la séance "Lâcher-prise" pour seulement 20 euros. Vous ressortirez de cette expérience détendu et apaisé, prêt à affronter les défis de la vie avec confiance.',
    duration: 30,
  },
  {
    name: "Soins énérgétique",
    description: "Amélioration du bien-être",
    price: 20,
    background: "/cards/card08.webp",
    link: "soins-energetique",
    description_long:
      "Passez à un niveau supérieur de bien-être avec notre prestation \"Soins Énergétiques\". Ce soin est un moment de détente et de guérison pour votre corps et votre esprit. Nous vous offrons une expérience holistique qui vous aidera à vous débarrasser du stress, à soulager les douleurs et à vous sentir plus équilibré.\nNotre pratique unique comprend l'utilisation d'outils énergétiques pour équilibrer vos chakras, accélérer vos dons spirituels, élargir votre champ vibratoire et activer vos systèmes énergétiques. Le résultat final sera un corps et un esprit plus lumineux, un système immunitaire stimulé et un bien-être général accru.\nInvestissez dans vous-même avec notre soin énergétique, disponible pour seulement 20 euros pour une durée de 30 minutes. Offrez-vous ce moment de paix pour vous sentir plus énergique et plus équilibré. Prenez rendez-vous dès aujourd'hui et découvrez les bienfaits de notre soin énergétique pour votre corps et votre esprit.",
    duration: 30,
  },
  {
    name: "Désenvoutement et Protection",
    description: "Se libérer du mal",
    price: 50,
    background: "/cards/card09.webp",
    link: "desenvoutement",
    description_long:
      "Vous êtes confronté à des attaques de forces, d'entités ou d'énergies négatives qui ont un impact sur votre vie quotidienne ? Vous ressentez un besoin de vous libérer de ces difficultés ? Alors la prestation de \"Désenvoutement et Protection\" pourra vous aider.\nAu cours de cette séance de 60 minutes pour 50 euros, je vous guiderai pour éliminer vos influences négatives pour vous permettre de retrouver votre harmonie et votre équilibre. Les effets de ce nettoyage puissant seront immédiats et durables dans votre vie : augmentation de votre taux vibratoire, amélioration de votre chance en général, moins de blocages, meilleur état psychique, augmentation de votre système immunitaire, réduction de l'anxiété et augmentation de votre confiance en vous.\nN'attendez plus pour vous libérer de ces forces négatives et retrouver une vie épanouissante et paisible. Je suis là pour vous aider à retrouver votre harmonie et votre équilibre.",
    duration: 60,
  },
  {
    name: "Séance de Spiritisme",
    description: "Message aux défunts",
    price: 50,
    background: "/cards/card03.webp",
    link: "spiritisme",
    description_long:
      "Vous voulez entrer en contact avec un être cher décédé ou obtenir un message de l'au-delà ? La séance de spiritisme \"Message aux défunts\" répondra à ce besoin.\nAu cours de cette séance de 60 minutes, je mettrai mes dons spirituels à votre disposition pour vous connecter à l'esprit de votre être cher décédé et vous transmettre les messages qu'il souhaite vous faire parvenir.\nEn utilisant diverses techniques telles que la médiumnité et la canalisation, je vous aiderai à faire la lumière sur les questions que vous vous posez et à apaiser vos peines en vous permettant de faire la paix avec les défunts qui vous sont chers.\nPour une séance efficace, merci de fournir le nom et les détails de l'être cher décédé que vous souhaitez contacter dans le champ \"informations complémentaires\".\nN'attendez plus pour obtenir les réponses que vous cherchez et entrer en contact avec les esprits de vos proches décédés, pour seulement 50 euros.",
    duration: 60,
  },
];

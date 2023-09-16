    import Bizso from "./lib/assets/collection/tanar/Bizso.png"
    import Farkas from "./lib/assets/collection/tanar/Farkas.png"
    import Moni from "./lib/assets/collection/tanar/Moni.png"
    import Nagyora from "./lib/assets/collection/tanar/Nagyora.png"
    import Rozgonyi from "./lib/assets/collection/tanar/Rozgonyi.png"
    import Tabi from "./lib/assets/collection/tanar/Tabi.png"
    import Bencus from "./lib/assets/collection/tanar/Bencus.png"
    import Dobi from "./lib/assets/collection/tanar/Dobi.png"
    import IvanEva from "./lib/assets/collection/tanar/IvanEva.png"
    import KocsiAndi from "./lib/assets/collection/tanar/KocsiAndi.png"
    import KoPasz from "./lib/assets/collection/tanar/KoPasz.png"
    import Kuti from "./lib/assets/collection/tanar/Kuti.png"
    import Matos from "./lib/assets/collection/tanar/Matos.png"
    import Meszaros from "./lib/assets/collection/tanar/Meszaros.png"

    import Arho from "./lib/assets/collection/diak/Arho.png"
    import Barni from "./lib/assets/collection/diak/Barni.png"
    import Eszter from "./lib/assets/collection/diak/Eszter.png"
    import Olivia from "./lib/assets/collection/diak/Olivia.png"
    import Zalan from "./lib/assets/collection/diak/Zalan.png"
    import Zeno from "./lib/assets/collection/diak/Zeno.png"

    export class diakCards {
        constructor(name, description, health, attack, source, stars, cost) {
            this.name = name;
            this.description = description;
            this.health = health;
            this.attack = attack;
            this.source = source;
            this.stars = stars;
            this.cost = cost;
        }
    }

    export class tanarCards {
        constructor(name, description, health, attack, source, stars, cost) {
            this.name = name;
            this.description = description;
            this.health = health;
            this.attack = attack;
            this.source = source;
            this.stars = stars;
            this.cost = cost;
        }
    }

    //TANAROK
    export const BizsoCard = new tanarCards("Bizsó", "Kedvence egy jó python feladat. Ha szépen kéred, kienged a hátsó kijáraton. Szexi apuka.", 9, 5, Bizso, 4, 2); 
    export const FarkasCard = new tanarCards("Dr. Farkas", "Filozófusszakállát évente vágja. Ennek ellenére mindig visszanő. Nem kell félni tőle.", 17, 8, Farkas, 5, 4);
    export const MoniCard = new tanarCards("Móni", "Hobbifilozófus. Képes 45 percig elemezni egy 10 soros lírai alkotást. Lenyűgöző!", 8, 6, Moni, 4, 2);
    export const NagyoraCard = new tanarCards("Big D", "Average tank build. Not much to say.", 30, 4, Nagyora, 3, 5);
    export const RozgonyiCard = new tanarCards("Rozgonyi", "Szeret sütni. Szeret még legózni és gombócot enni is. A fiát láthatólag annyira nem.", 17, 3, Rozgonyi, 3, 3);
    export const TabiCard = new tanarCards("Tábi", "Tesitanár és röplabdaedző. Epic gamer szabadidejében. Sose hagyja ki az alkalmat, hogy politizáljon.", 6, 7, Tabi, 3, 2);

    //not yet detailed
    export const BencusCard = new tanarCards("Bencus", "Lorem Ipsum", -1, -1, Bencus, 5, -1);
    export const DobiCard = new tanarCards("Dobi", "Lorem Ipsum", -1, -1, Dobi, 6, -1);
    export const IvanEvaCard = new tanarCards("IvanEva", "Lorem Ipsum", -1, -1, IvanEva, 3, -1);
    export const KocsiAndiCard = new tanarCards("KocsiAndi", "Lorem Ipsum", -1, -1, KocsiAndi, 3, -1);
    export const KoPaszCard = new tanarCards("KoPasz", "Lorem Ipsum", -1, -1, KoPasz, 5, -1);
    export const KutiCard = new tanarCards("Kuti", "Lorem Ipsum", -1, -1, Kuti, 5, -1);
    export const MatosCard = new tanarCards("Matos", "Lorem Ipsum", -1, -1, Matos, 4, -1);
    export const MeszarosCard = new tanarCards("Meszaroso", "Lorem Ipsum", -1, -1, Meszaros, 3, -1);

    //DIAKOK
    export const ArhoCard = new diakCards("Arhó", "7 évesen megfejtette a tudományt. Hisz a szabad akaratban.", 12, 6, Arho, 4, 3); 
    export const BarniCard = new diakCards("Barni", "Szeretik a lányok, szeretik a fiúk, ő pedig a krumplis tésztát szereti.", 18, 7, Barni, 3, 4);
    export const EszterCard = new diakCards("Eszter", "Nem tart otthon tyúkokat, de nagyon szeretne. Este 9-kor kizavarják a kollégium gépterméből.", 5, 5, Eszter, 4, 1);
    export const OliviaCard = new diakCards("Olívia", "Lehelt már számtalanszon visszautasította. Oliver ikertestvére. Lehel ezt még nem tudja.", 12, 4, Olivia, 4, 2);
    export const ZalanCard = new diakCards("Zalán", "Mindenki kedvenc DÖK elnöke. Volt. Fasza bőrdzseki!", 10, 5, Zalan, 3);
    export const ZenoCard = new diakCards("Zénó", "SG DÖK elnök. Ha a terem hátsó sarkában valaki fulladozik a nevetéstől, ő az.", 10, 5, Zeno, 5);

    export let tanarCardsArr = [BizsoCard, FarkasCard, MoniCard, NagyoraCard, RozgonyiCard, TabiCard,BencusCard,DobiCard,IvanEvaCard,KocsiAndiCard,KoPaszCard,KutiCard,MatosCard,MeszarosCard]
    export let diakCardsArr = [ArhoCard, BarniCard, EszterCard, OliviaCard, ZalanCard, ZenoCard]
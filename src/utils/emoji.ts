import { App } from "@slack/bolt";

const emojis = {
    yay: "yay",
    OSF: "osf",
    hooray: "tada",
    arrived: "package",
    draw: "pencil2",
    art: "art",
    paint: "art",
    wrote: "lower_left_fountain_pen",
    slack: "slack",
    pcb: "pcb",
    onboard: "pcb",
    circuit: "pcb",
    kicad: "pcb",
    easyeda: "pcb",
    figma: "figma",
    "3d print": "3d-printer",
    "3d printing": "3d-printer",
    "3d printer": "3d-printer",
    covid: "coronavirus",
    singapore: "singaporeparrot",
    canada: "canadaparrot",
    india: "indiaparrot",
    space: "rocket",
    sleep: "zzz",
    hardware: "hardware",
    roshan: "roshan",
    sampoder: "sam-1",
    "vs code": "vsc",
    vscode: "vsc",
    "woo hoo": "tada",
    celebrate: "tada",
    cooking: "pan_with_egg",
    cooked: "pan_with_egg",
    cook: "pan_with_egg",
    birthday: "birthday",
    bday: "birthday",
    pumpkin: "jack_o_lantern",
    fall: "fallen_leaf",
    thanksgiving: "turkey",
    christmas: "christmas_tree",
    santa: "santa",
    snow: "snowflake",
    snowing: "snowflake",
    snowman: "snowman",
    vercel: "vercel",
    sunrise: "sunrise_over_mountains",
    sunset: "city_sunset",
    google: "google",
    soccer: "soccer",
    football: "soccer",
    car: "car",
    driving: "car",
    bank: "bank-hackclub",
    "shopping list": "hardware",
    github: "github",
    twitter: "twitter",
    bot: "robot_face",
    robot: "robot_face",
    robotics: "robot_face",
    minecraft: "minecraft",
    game: "video_game",
    npm: "npm",
    solder: "hardware",
    soldering: "hardware",
    arduino: "hardware",
    instagram: "instagram",
    observable: "observable",
    js: "js",
    javascript: "js",
    reactjs: "react",
    python: "python",
    swift: "swift",
    xcode: "swift",
    "x code": "swift",
    swiftui: "swift",
    "swift ui": "swift",
    golang: "gopher",
    rust: "rustlang",
    deno: "deno",
    blender: "blender",
    salad: "green_salad",
    adobe: "adobe",
    photoshop: "photoshop",
    inktober: "lower_left_fountain_pen",
    storm: "thunder_cloud_and_rain",
    rain: "rain_cloud",
    dino: "sauropod",
    school: "school_satchel",
    backpack: "school_satchel",
    linux: "linux",
    hacktober: "hacktoberfest",
    hacktoberfest: "hacktoberfest",
    exams: "books",
    exam: "books",
    studying: "books",
    studied: "books",
    study: "books",
    react: "react",
    apple: "appleinc",
    cat: "cat",
    dog: "dog",
    code: "goose-honk-technologist",
    hack: "goose-honk-technologist",
    autumn: "hackautumn",
    "Happy Birthday Zach": "zachday-2020",
    debate: "hackdebate",
    "next.js": "nextjs",
    nextjs: "nextjs",
    movie: "film_projector",
    halloween: "jack_o_lantern",
    pizza: "pizza",
    scrappy: "scrappy",
    cycle: "bike",
    bike: "bike",
    "Big Sur": "bs",
    zoom: "zoom",
    ship: "ship",
    macbook: "macbook-air-space-gray-screen",
    guitar: "guitar",
    complain: "old-man-yells-at-cloud",
    fight: "old-man-yells-at-cloud",
    cricket: "cricket_bat_and_ball",
    vim: "vim",
    docker: "docker",
    cake: "cake",
    notion: "notion",
    fedora: "fedoralinux",
    replit: "replit",
    mask: "mask",
    leap: "leap",
    discord: "discord",
    "/z": "zoom",
    postgres: "postgres",
    gatsby: "gatsby",
    prisma: "prisma",
    graphql: "graphql",
    "product hunt": "producthunt",
    java: "java_duke",
    repl: "replit",
    "repl.it": "replit",
    "rick roll": "smolrick",
    BrainDUMP: "braindump",
    firefox: "firefoxlogo",
    vivaldi: "vivaldi",
    "ABCO-1": "abcout",
    "nix": "nix",
    "nixos": "nix",
    "nixpkgs": "nix",
    "typescript": "typescript",
    "ts": "typescript",
    "zephyr": "train",
    "summer": "sunny",
    "plane": "airplane",
    "train": "train",
    "bus": "bus",
    "bug": "bug",
    "debug": "dino-debugging",
    "debugging": "dino-debugging",
    "awesome": "awesome",
    "graph": "chart_with_upwards_trend",
    "chart": "chart_with_upwards_trend",
    "boba": "boba-parrot",
    "bubble tea": "boba-parrot",
    spotify: "spotify",
    repair: "hammer_and_wrench",
    cow: "cow",
    doge: "doge",
    shibe: "doge",
    dogecoin: "dogecoin",
    blockchain: "chains",
    ticket: "admission_tickets",
    homework: "memo",
    hw: "memo",
    piano: "musical_keyboard",
    orpheus: "orpheus",
    chess: "chess_pawn",
    pr: "pr",
    "pull request": "pr",
    bread: "bank-hackclub",
    nft: "nft",
    hns: "hns",
    wahoo: "wahoo-fish",
    aoc: "aoc",
    advent: "aoc",
    svelte: "svelte",
    cold: "snowflake",
    tailwind: "tailwind",
    tailwindcss: "tailwind",
    c: "c",
    squaresupply: "squaresupply",
    gamelab: "gamelab",
    "annoying site": "annoyingsite",
    redwood: "redwoodjs",
    redwoodjs: "redwoodjs",
    homebrew: "homebrew-mac",
    stickers: "stickers",
    club: "hackclub",
    think: "thinking",
    thinking: "thinking",
    cool: "cooll-dino",
    science: "scientist",
    research: "microscope",
    biology: "microbe",
    brain: "brain",
    "science fiction": "flying_saucer",
    "sci-fi": "alien",
    mexico: "mexicoparrot",
    food: "shallow_pan_of_food",
    sad: "sadge",
    galaxy: "milky_way",
    plant: "potted_plant",
    plants: "potted_plant",
    picture: "camera",
    pictures: "camera",
    photography: "camera_with_flash",
    assemble: "assemble",
    sprig: "sprig-dino",
    laser: "monkey-laser",
    music: "music",
    "<#C045S4393CY>": "10daysinpublic",
    "10daysinpublic": "10daysinpublic",
    "hardware party": "winter-hardware-wonderland",
    "hardware wonderland": "winter-hardware-wonderland",
    "hardware-party": "winter-hardware-wonderland",
    "days of making": "winter-hardware-wonderland",
    "winter hardware": "winter-hardware-wonderland",
    winter: "winter-hardware-wonderland",
    wonderland: "winter-hardware-wonderland",
    whw: "winter-hardware-wonderland",
    ipfs: "ipfs",
    "the orpheus show": "tos-icon",
    "orpheus show": "tos-icon",
    "the orpheus podcast": "tos-icon",
    "orpheus podcast": "tos-icon",
    podcast: "studio_microphone",
    quest: "quests",
    puzzmo: "puzzmo",
    "purple bubble": "purplebubble",
    purplebubble: "purplebubble",
    summit: "leaders-summit",
    "summit vision": "summit-vision",
    "apple vision": "summit-vision",
    "hack hour": "the_doctor"
} as { [key: string]: string };

export async function reactOnContent(app: App, data: {
    content: string,
    channel: string,
    ts: string
}) {
    Object.keys(emojis).forEach(async (keyword) => {
        try {
            if (
                data.content.toLowerCase().search(new RegExp("\\b" + keyword + "\\b", "gi")) !== -1
            ) {
                await app.client.reactions.add({
                    channel: data.channel,
                    timestamp: data.ts,
                    name: emojis[keyword]
                });
            }
        }
        catch (e) {
            console.log(data.channel)
            console.log(e)
        }
    });
}
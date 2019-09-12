const mailArr = [
    "FIGHT4SANCTUARY",
    "LOOTLOOTLOOT",
    "JOYPUKE",
    "BL3REVEAL",
    "BL3WELCOME",
    "BL3ATE3",
    "2KLOVE",
    "HEYSUGAR",
    "SOHAPPYTOGETHER",
    "CLAPTASTIC",
    "MYMAIN",
    "ONTHEHUNT",
    "POWERUPEMAIL",
    "DASHERZ",
    "LESSTHANTHREE",
    "FRESHBOOTY",
    "BUILDURSQUAD",
    "OVERCLOCKED",
    "FORTNITEXMAYHEM",
    "ABCEASYAS123",
    "DUCTTAPEMOD",
    "MADSKILLZ",
    "ITSHERE",
    "JABBER",
    "UNBLINKINGEYE",
    "ALMOSTTHERE"
];
mailArr.forEach(item => {
    const obj = {
        code: item,
    };
    $.post("https://2kgames.crowdtwist.com/code-redemption-campaign/redeem?cid=5264", JSON.stringify(obj)).then(resp => {
        console.info(resp)
    });
});
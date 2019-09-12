const vaultArr = [
    "BL3MUSEUMCOSPLAY",
    "GAMEVIP",
    "LOADINGBAR",
    "ILOVEBAGUETTE",
    "BL3FREVENTVIP",
    "HALVERHAHN",
    "MAYHEMPRIDE",
    "PWR2PLYRS",
    "BONERFART",
    "MAYHEM",
    "CRUMPOCALYPSE",
    "GODSDONTNEGOTIATE",
    "TWOWEEKS",
    "JVMVIP",
    "SMARTOYSVIP",
    "MEDIAMARKTVIP",
    "BOLVIP",
    "GAMEMANIAVIP",
    "ALLYOURGAMESVIP",
    "NEDGAMEVIP",
    "YOURGAMEZONEVIP",
    "INTERTOYSVIP",
    "PLAYERONEVIP",
    "CHILDRENOFTHEVAULT",
    "SEVENDAYS",
    "AIRLEMAGVIP",
    "DREAMLANDVIP",
    "JOYPUKE",
    "Skagbait"
];
vaultArr.forEach(item => {
    const obj = {
        code: item,
    };
    $.post("https://2kgames.crowdtwist.com/code-redemption-campaign/redeem?cid=5261", JSON.stringify(obj)).then(resp => {
        console.info(resp)
    });
});


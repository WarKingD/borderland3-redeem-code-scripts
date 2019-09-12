const creatorArr = [
    "CohhVIP",
    "GREGORONKH",
    "bonjwa-bl3launch",
    "EARLYACCESS",
    "PIETSMIET-BL3LAUNCH",
    "LARALOFT-BL3LAUNCH",
    "DOKTORFROID-BL3LAUNCH"
];
creatorArr.forEach(item => {
    const obj = {
        code: item,
    };
    $.post("https://2kgames.crowdtwist.com/code-redemption-campaign/redeem?cid=5263", JSON.stringify(obj)).then(resp => {
        console.info(resp)
    });
});

# Borderland 3 redeem code scripts

# Usages

## Export list

1. Open https://old.reddit.com/r/borderlands3/comments/bxgq5p/borderlands_vip_program_codes/

2. Hit F12 open browser devtools, switch to `Console` tab.

3. Paste into the command line box, submit.

4. Follow the output guide, copy the codes, maybe save as text file for later use.

## Batch redeem

1. Open https://borderlands.com/en-US/vip-codes/, login your account.

2. Open https://2kgames.crowdtwist.com/

3. Copy `requestRedeem.js` content.

4. Hit F12 open browser devtools, switch to `Console` tab.
 
5. Paste into the command line box, add first line with `fetchList.js` export codes. For example:  `
window.__AUTO_REDEEM_CODE_SCRIPT_DATA = '{"meta":{"type":"reddit/code-sheet","version":1},"data":{"list":[{"code":"PROFESSORBROMANVIP","point":"200","valid":false,"type":"creator","date":""}]}';
`

6. Submit, result will show in the console.

# Help?

If there's something wrong with my script or bl change something, please submit an issue.

# Credits

Original collected by u/Holy_Jumper (https://old.reddit.com/user/Holy_Jumper).

Topic: https://old.reddit.com/r/borderlands3/comments/bxgq5p/borderlands_vip_program_codes/
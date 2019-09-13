(async function () {
    // Return value workaround
    await new Promise(resolve => setTimeout(resolve, 0));

    /**
     * Configuration, env
     */
    const version = '0.0.2';
    const githubUrl = 'https://github.com/WarKingD/borderland3-redeem-code-scripts';
    const redeemCodeUrl = 'https://2kgames.crowdtwist.com/code-redemption-campaign/redeem';
    const importVersion = 1;
    const importType = 'reddit/code-sheet';

    /**
     * Main
     */
    console.info(`\n`);
    console.info(`Auto redeem code script. Version: ${version}, importVersion: ${importVersion}.`);
    console.info(`\n`);
    // Profile - begin
    const _start = new Date;
    console.info(`[Profile] Started at: ${_start.toString()}`);

    // Import
    console.log(`Import list now...`);
    const data = window.__AUTO_REDEEM_CODE_SCRIPT_DATA || null;
    if (!data) {
        errorOnWrongList();
        return;
    }
    const list = dumbDecoder(data);
    if (!list) {
        return;
    }
    console.log(`Import list done, length: ${list.length}`);

    // Request
    let reqList = [];
    list.forEach(({ code, valid, type }) => {
        if (!valid) {
            return;
        }
        const typeToCidMap = {
            creator: 5263,
            email: 5264,
            vault: 5261,
        };
        const cid = typeToCidMap[type];
        if (!cid) {
            console.warn('Unknown type, cannot match right cid. Skip. Detail: ');
            console.warn(`Code: ${code}, type: ${type}`);
            return;
        }
        reqList.push({ code, type, cid });
    });

    let hasError = false;
    try {
        await concurrentLimitMap(reqList, 10, ({ code, type, cid }) => {
            return new Promise(resolve => {
                fetch(`${redeemCodeUrl}?cid=${cid}`, {
                    method: 'POST',
                    body: JSON.stringify({ code }),
                    mode: 'no-cors',
                    credentials: 'include',
                    headers:{
                        'Accept': "application/json, text/plain, */*",
                        'Content-Type': "application/json;charset=utf-8",
                        'X-CT-APP': "widget",
                    }})
                    .then(resp => {
                        if (resp.status !== 200) {
                            throw resp;
                        }
                    })
                    .catch(async resp => {
                        hasError = true;
                        let reason = 'Unknown';
                        if (resp.status) {
                            reason = `Server response error: code: ${resp.status}`;
                            try {
                                const msg = await resp.text();
                                reason += ` msg: ${msg}`;
                            } catch (e) {}
                        }
                        console.error(`Code: ${code}, type: ${type}, cid: ${cid} failed, reason: ${reason}`);
                    }).finally(() => {
                        resolve();
                    });
            });
        });
    } catch (e) {}
    if (!hasError) {
        console.info('All redeem request are successful.');
    } else {
        console.error('There\'s one or more redeem request failed.');
    }

    console.log('\n');
    // Profile - end
    const _end = new Date;
    console.info(`[Profile] End at: ${_end.toString()}`);
    const _waste = ((_end - _start) / 1000).toFixed(5);
    console.info(`[Profile] Waste time: ${_waste}s`);

    function concurrentLimitMap(list, limit, handle) {
        const recursion = arr => {
            return handle(arr.shift())
                .finally(() => {
                    if (arr.length !== 0) {
                        return recursion(arr);
                    }
                });
        };

        let _list = list.slice();
        let asyncList = [];
        if (_list.length < limit) {
            limit = _list.length;
        }
        while (limit--) {
            asyncList.push(recursion(_list));
        }
        return Promise.all(asyncList);
    }

    function _errorList() {
        console.error('Please add fetchList.js export codes to this script first line. For example: ');
        console.error('\n1. window.__AUTO_REDEEM_CODE_SCRIPT_DATA = `{"meta":{"type":"reddit/code-sheet","version":1},"data":{"list":[{"code":"BL3WELCOME","point":"250","valid":true,"type":"email","date":""}]}}`;\n\n2. (async function () {\n3.     // Return value workaround\n4.     await new Promise(resolve => setTimeout(resolve, 0));');
    }

    function errorOnWrongList() {
        console.error('You are not correct set the list.');
        _errorList();
    }

    function errorOnIncompatibleList(ver) {
        console.error('Your are using incompatible list. Please download correct version for this script to use.');
        console.error(`Current support list version: ${importVersion}, provided script version: ${ver}`);
    }

    function errorOnDumbParse() {
        console.error('This list is broken.');
        _errorList();
        console.error(`How to get redeem code list: ${githubUrl}/blob/master/README.md`);
    }

    function dumbRemark()
    {
        return {
            header: '---BL3-REDEEM-CODE-SCRIPTS-EXPORT---BEGIN---',
            footer: '---BL3-REDEEM-CODE-SCRIPTS-EXPORT---END---',
        }
    }

    function dumbDecoder(data)
    {
        data = dumbUnpack(data);
        if (!data) {
            return false;
        }
        return dumbParser(data);
    }

    function dumbParser(decodeData)
    {
        if (!decodeData.meta || decodeData.meta.type !== importType || !decodeData.data) {
            errorOnWrongList();
            return false;
        }
        if (decodeData.meta.version !== importVersion) {
            errorOnIncompatibleList();
            return false;
        }
        const list = decodeData.data.list;
        if (!list) {
            errorOnIncompatibleList();
            return false;
        }
        return list;
    }

    function dumbUnpack(data)
    {
        if (typeof data !== 'string') {
            errorOnDumbParse();
            return false;
        }
        const id = dumbRemark();
        let remark = false;
        const remarkBeginPos = data.lastIndexOf(id.header);
        let remarkEndPos;
        if (remarkBeginPos !== -1) {
            remarkEndPos = data.lastIndexOf(id.footer);
            if (remarkBeginPos !== -1) {
                remark = true;
            }
        }
        if (remark) {
            data = data.substring(id.header.length, remarkEndPos);
        }
        data = data.trim();
        try {
            data = JSON.parse(data);
        } catch (e) {
            errorOnDumbParse();
            return false;
        }
        return data;
    }

})();

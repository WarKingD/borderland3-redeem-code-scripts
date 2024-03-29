(async function ($) {
    // Return value workaround
    await new Promise(resolve => setTimeout(resolve, 0));

    /**
     * Configuration, env
     */
    const version = '0.0.2';
    const githubUrl = 'https://github.com/WarKingD/borderland3-redeem-code-scripts';
    const currentSupportColumnLength = 5;
    const currentSupportColumnName = ['code', 'value', 'valid', 'type', 'date'];
    const exportVersion = 1;
    const exportVarName = 'window.__AUTO_REDEEM_CODE_SCRIPT_DATA';

    /**
     * Main
     */
    console.info(`\n`);
    console.info(`Fetch code list script. Version: ${version}, exportVersion: ${exportVersion}.`);
    console.info(`\n`);
    // Profile - begin
    const _start = new Date;
    console.info(`[Profile] Started at: ${_start.toString()}`);

    console.log(`Get table...`);
    const $table = $('.thing.self .usertext-body table').eq(0);
    const $headRow = $table.find('thead tr').eq(0);
    const headLength = $headRow.children().size();
    console.log(`Table head column count: ${headLength}`);

    // Verify
    if (!$headRow[0]) {
        errorOnIncompatible();
        return;
    }
    const $headChildren = $headRow.children();
    if ($headChildren.size() !== currentSupportColumnLength) {
        errorOnIncompatible();
        return;
    }
    if (currentSupportColumnName.some((keyword, i) => {
        const text = $headChildren.eq(i).text().toLowerCase();
        return !text.includes(keyword)
    })) {
        errorOnIncompatible();
        return;
    }
    const $rows = $table.find('tbody tr');
    if (!$rows[0]){
        errorOnWrongSheet();
        return;
    }

    // Collect
    const rowsCount = $rows.size();
    console.info(`Content rows count: ${rowsCount}`);
    let validCount = 0;
    let list = [];
    $rows.each(function () {
        const $children = $(this).children();
        const obj = {
            code: '',
            point: '',
            valid: false,
            type: '',
            date: '',
        };
        $children.each(function (i) {
            let value = $(this).text().trim();
            switch (i) {
                case 0:
                    obj.code = value;
                    break;
                case 1:
                    obj.point = value;
                    break;
                case 2:
                    obj.valid = value.toLowerCase().includes('yes');
                    break;
                case 3:
                    obj.type = value.toLowerCase();
                    break;
                case 4:
                    obj.date = value;
                    break;
            }
        });
        if (obj.valid) {
            validCount++;
        }
        list.push(obj);
    });

    // Report
    console.info(`Valid: ${validCount}, invalid: ${rowsCount - validCount}`);

    // Export
    console.log('Export list now. ');
    console.log('\n');
    dumbEncoder({ type: 'reddit/code-sheet', version: exportVersion }, { list });
    console.log('\n');
    dumbExportNotice();

    console.log('\n');
    // Profile - end
    const _end = new Date;
    console.info(`[Profile] End at: ${_end.toString()}`);
    const _waste = ((_end - _start) / 1000).toFixed(5);
    console.info(`[Profile] Waste time: ${_waste}s`);

    function dumbExportNotice()
    {
        console.log('Please click "Copy" button at code end, ');
        console.log('or click "Show more" button (if that exist) expand all codes, then select all codes and copy.')
    }

    function dumbRemark()
    {
        return {
            header: '---BL3-REDEEM-CODE-SCRIPTS-EXPORT---BEGIN---',
            footer: '---BL3-REDEEM-CODE-SCRIPTS-EXPORT---END---',
        }
    }

    function dumbEncoder(meta, data)
    {
        const { header, footer } = dumbRemark();
        console.log(header);
        let value = JSON.stringify({ meta, data });
        if (typeof exportVarName !== 'undefined') {
            value = `${exportVarName} = '${value}'`;
        }
        console.log(value);
        console.log(footer);
    }

    function errorOnIncompatible() {
        console.error('Your are use incompatible script. Please get new version on github repo.');
        console.error(`${githubUrl}/`);
        console.error('If there\'s no new version for you, please submit an issue on: ');
        console.error(`${githubUrl}/issue`);
    }

    function errorOnWrongSheet() {
        console.error('Your are getting wrong code sheet. Please submit an issue on: ');
        console.error(`${githubUrl}/issue`);
    }

})(window.jQuery);




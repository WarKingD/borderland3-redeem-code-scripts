(function ($) {
    /**
     * Configuration, env
     */
    const version = '0.0.1';
    const githubUrl = 'https://github.com/WarKingD/borderland3-redeem-code-scripts';
    const currentSupportColumn = 5;
    const exportVersion = 1;

    /**
     * Main
     */
    console.info(`\n`);
    console.info(`Fetch code list script. Version: ${version}.`);
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
    if (!$headRow[0] || $headRow.children().size() !== currentSupportColumn) {
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
        const { head, footer } = dumbRemark();
        console.log(head);
        console.log(JSON.stringify({ meta, data }));
        console.log(footer);
    }

    function errorOnIncompatible() {
        console.error('Your are use incompatible script. Please get new version on github repo.');
        console.error(`${githubUrl}/`);
        console.error('If there\'s no new version for you, please submit a issue on: ');
        console.error(`${githubUrl}`);
    }

    function errorOnWrongSheet() {
        console.error('Your are getting wrong code sheet. Please submit a issue on: ');
        console.error(`${githubUrl}/issue`);
    }

})(window.jQuery);




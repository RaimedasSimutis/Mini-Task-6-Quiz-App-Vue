module.exports = {
	root: true,
	extends: 'stylelint-config-standard',
	plugins: ['stylelint-scss'],
	rules: {
		'at-rule-no-unknown': null,
		'scss/at-rule-no-unknown': true,
		'block-no-empty': null,
		'color-no-invalid-hex': true,
		'comment-empty-line-before': [
			'always',
			{
				ignore: ['stylelint-commands', 'after-comment']
			}
		],
		'declaration-colon-space-after': 'always-single-line',
		// indentation: [
		// 	'tab',
		// 	{
		// 		except: ['value'],
		// 		ignore: ['inside-parens'],
		// 		baseIndentLevel: 1
		// 	}
		// ],
		'max-empty-lines': 2,
		'rule-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
				ignore: ['after-comment']
			}
		],
		'unit-whitelist': ['em', 'rem', '%', 's', 'px', 'vh', 'vw', 'deg']
	}
}

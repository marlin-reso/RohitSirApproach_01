/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test pan advance informaton API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidPANNumbers = [
        

        //Invalid pan number
        { pan: 'AADCR2224',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Too Short PAN' },
    //  { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'correct pan' },
    //  { pan: '\u0041\u0041\u0044\u0043\u0052\u0032\u0032\u0032\u0034\u0048',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: ' Unicode PAN' },
        { pan: 'ÁÂD̃ĊR̄2̇2̀2̇4̂Ȟ',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Diacritical PAN' },
        { pan: "<script>alert('XSS')</script>",tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Cross-Site Scripting (XSS) vulnerabilities PAN' },
        { pan:  "' OR 1=1 --", tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary',description: ' SQL injection string PAN' },
        { pan: 'AADCR2224H'*10,tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Boundary Testing PAN' },
        { pan: '../../AADCR2224',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Basic Directory Traversal Payload in PAN' },
        { pan: 'AADCR2224HAA',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Too Long PAN' },
    //  { pan: 'ayipm8112b',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'PAN with Lowercase Letters' },
        { pan: 'AAA22224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Missing Alphabet Characters' },
        { pan: 'AAAAAR22H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Missing Numeric Characters' },
        { pan: 'AADCR@2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'PAN with Special Characters' },
        { pan: ' AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'PAN with Leading Space' },
        { pan: 'AADCR2224H ',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'PAN with Trailing Space' },
        { pan: 'AAD CR2 224 H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'PAN with Embedded Space' },
        { pan: '1234R2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Numeric Characters in Place of Letters' },
        { pan: 'AADCRABCDH',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Alphabetic Characters in Place of Numbers' },
        { pan: 'AAAAA1111A',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Repeated Characters' },
        { pan: '1111222233',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Only Numeric Characters' },
        { pan: 'AADCRHHHHH',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Only Alphabetic Characters' },
        { pan: 'AADCR2224H#',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Special Character at the End' },
        { pan: 'AADCRZZZZZ',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'All Alphabetic Characters' },
        { pan: 'A',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Single Character PAN' },
        { pan: 'AADCR  2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'PAN with Extra Spaces' },
        { pan: '',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Empty PAN' },
        { pan: 'AADCR*2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Non-Alphanumeric Characters in PAN' },        
    //    { pan: '\u0041\u0041\DCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Combination of Unicode and Characters' }, 
        { pan: 'ABCDE1234567890',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Excessively Long Number' }, 
        { pan: undefined,tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'undefined' },
        { pan: Boolean,tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'boolean' },
        { pan: true,tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'boolean true' },
        { pan: false,tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'boolean flase' },
        { pan: null,tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Null pan' },
        { pan: 'null',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'null String pan' },
        { pan: 0,tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Zero pan number' },


        //Invalid tan number
        { pan: 'AADCH6128C',tan: 'RTKS25747', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Too Short TAN' },
        //    { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'correct TAN' },
        //    { pan: '\u0041\u0041\u0044\u0043\u0052\u0032\u0032\u0032\u0034\u0048',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: ' Unicode TAN' },
        { pan: 'AADCH6128C',tan: 'R̄T̃K̂S̈2̀5̈7́4̇7́Ḃ', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Diacritical TAN' },
        { pan: 'AADCH6128C', tan: "' OR 1=1 --", financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary',description: ' SQL injection string TAN' },
        { pan: 'AADCH6128C',tan: 'RTKS25747B'*10, financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Boundary Testing TAN' },
        { pan: 'AADCH6128C',tan: '../../RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Basic Directory Traversal Payload in TAN' },
        { pan: 'AADCH6128C',tan: 'RTKS25747BB', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Too Long TAN' },
    //  { pan: 'AADCH6128C',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'TAN with Lowercase Letters' },
        { pan: 'AADCH6128C',tan: 'RRTS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Missing Alphabet Characters' },
        { pan: 'AADCH6128C',tan: 'RRRR25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Missing Numeric Characters' },
        { pan: 'AADCH6128C',tan: 'RTKS@25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'TAN with Special Characters' },
        { pan: 'AADCH6128C',tan: ' RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'TAN with Leading Space' },
        { pan: 'AADCH6128C',tan: 'RTKS25747B ', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'TAN with Trailing Space' },
        { pan: 'AADCH6128C',tan: 'RTK S25 747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'TAN with Embedded Space' },            
        { pan: '1234R2224H',tan: '182025747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Numeric Characters in Place of Letters' },
        { pan: 'AADCH6128C',tan: 'RTKSBEGDGB', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Alphabetic Characters in Place of Numbers' },
        { pan: 'AADCH6128C',tan: 'RRRRR11111', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Repeated Characters' },
        { pan: 'AADCH6128C',tan: '1112223333', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Only Numeric Characters' },
        { pan: 'AADCH6128C',tan: 'RRRTTTKKKK', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Only Alphabetic Characters' },
        { pan: 'AADCH6128C',tan: 'RTKS25747#', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Special Character at the End' },
        { pan: 'AADCH6128C',tan: 'RTKSZZZZZB', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'All Alphabetic Characters' },
        { pan: 'AADCH6128C',tan: 'R', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Single Character TAN' },
        { pan: 'AADCH6128C',tan: 'RTKS2  5747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'TAN with Extra Spaces' },
        { pan: 'AADCH6128C',tan: '', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Empty TAN' },
        { pan: 'AADCH6128C',tan: 'RTKS2_5747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Non-Alphanumeric Characters in TAN' },        
  //    { pan: '\u0041\u0041\DCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Combination of Unicode and Characters' }, 
        { pan: 'AADCH6128C',tan: 'RTKS25747B5763890', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Excessively Long Number' }, 
        { pan: 'AADCH6128C',tan: undefined, financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'undefined TAN' },
        { pan: 'AADCH6128C',tan: Boolean, financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'boolean TAN' },
        { pan: 'AADCH6128C',tan: true, financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'boolean true TAN' },
        { pan: 'AADCH6128C',tan: false, financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'boolean flase TAN' },
        { pan: 'AADCH6128C',tan: null, financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Null TAN' },
        { pan: 'AADCH6128C',tan: 'null', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'null String TAN' },
        { pan: 'AADCH6128C',tan: 0, financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Zero TAN number' },

        //Invalid financial year
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023 - 24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Extra spaces around the dash.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: ' 2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Leading whitespace.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24 ',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Trailing whitespace.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24-25',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Too many segments.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '20-2024',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Mismatched year format.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '20x3-2y4',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Contains special characters.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023--24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Multiple dashes.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '1899-00',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Year before the valid range.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-25',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Years not sequential.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2024-23',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Inverted year order.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-23',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Invalid same-year range.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '@2023-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Starts with a special character.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24!',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Ends with a special character.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023\n24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Contains escape characters.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '20\n23-24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Line breaks within the string.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023\t24',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Tab character in the field.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: null,quarter:'Q4',typeOfReturn:'nonSalary', description: 'Null value financial year' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: undefined,quarter:'Q4',typeOfReturn:'nonSalary', description: 'Undefined value financial year' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Empty String financial year' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '202324',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Field accepts only strings.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: ['2023-24'],quarter:'Q4',typeOfReturn:'nonSalary', description: 'Array instead of string financial year' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: { 'year': '2023-24' },quarter:'Q4',typeOfReturn:'nonSalary', description: 'Object instead of string financial year' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: true,quarter:'Q4',typeOfReturn:'nonSalary', description: 'Boolean true financial year' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: false,quarter:'Q4',typeOfReturn:'nonSalary', description: 'Boolean false financial year' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '3000-99',quarter:'Q4',typeOfReturn:'nonSalary', description: 'Unrealistic year far in the future financial year' },


        //Invalid quarter value
   //     { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'q4',typeOfReturn:'nonSalary', description: 'quarter in lower case' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:' Q4',typeOfReturn:'nonSalary', description: 'quarter Leading space. ' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4 ',typeOfReturn:'nonSalary', description: 'quarter Trailing space.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q-4',typeOfReturn:'nonSalary', description: 'quarter Invalid separator.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'4Q',typeOfReturn:'nonSalary', description: 'quarter Incorrect order.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q04',typeOfReturn:'nonSalary', description: 'quarter Extra leading zero in quarter number.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Quarter4',typeOfReturn:'nonSalary', description: 'quarter Full word instead of shorthand. ' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q5',typeOfReturn:'nonSalary', description: 'quarter Exceeds valid range (Q1-Q4). ' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q0',typeOfReturn:'nonSalary', description: 'Invalid quarter (0 does not exist). ' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q-1',typeOfReturn:'nonSalary', description: 'quarter Negative quarter value. ' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q1Q2',typeOfReturn:'nonSalary', description: 'Multiple quarters in one field.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q@',typeOfReturn:'nonSalary', description: 'quarter Contains special character. ' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4!',typeOfReturn:'nonSalary', description: 'quarter Ends with a special character. ' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:null,typeOfReturn:'nonSalary', description: 'quarter Null value. ' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:Boolean,typeOfReturn:'nonSalary', description: 'quarter boolean value ' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:undefined,typeOfReturn:'nonSalary', description: 'quarter Undefined value. ' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'',typeOfReturn:'nonSalary', description: 'quarter as empty string' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:['Q4'],typeOfReturn:'nonSalary', description: 'quarter Array instead of string.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:{ 'quarter': 'Q4' },typeOfReturn:'nonSalary', description: 'quarter Object instead of string.' },



        //Invalid type of return
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonWage', description: 'typeOfReturn Not part of the allowed values.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'earnings', description: 'typeOfReturn Unrecognized value.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'null', description: 'typeOfReturn ' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary!', description: 'typeOfReturn Ends with a special character.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'@nonSalary', description: 'typeOfReturn Starts with a special character.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:'nonSalary\t', description: 'typeOfReturn Contains tab character. ' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:null, description: 'typeOfReturn Null value is invalid.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:undefined, description: 'typeOfReturn Undefined value is not acceptable.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:' ', description: 'typeOfReturn empty string' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:true, description: 'typeOfReturn boolean true' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:false, description: 'typeOfReturn boolean false' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:['nonSalary'], description: 'typeOfReturn Array instead of string.' },
        { pan: 'AADCR2224H',tan: 'RTKS25747B', financialYear: '2023-24',quarter:'Q4',typeOfReturn:{ 'type': 'nonSalary' }, description: 'typeOfReturn Object instead of string. ' },
                  
    ];
    
    const errorCodeToMessage = {
        'ENI004': 'No Information Found.',
        'EIP018': 'Incorrect Input.',
        'EBF017': 'Blank Input Field.',
        'EPI022': 'Payload is Incorrect.',
        'EUP007':'Unable To Process. Please Reach Out To Support.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'tds return verification');
    filteredTestCases.forEach((testCase) => {
        invalidPANNumbers.forEach((invalidCase) => {                                                       
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;             
                const requestData = { ...payLoad.requestData,  pan: invalidCase.pan, tan: invalidCase.tan, financialYear: invalidCase.financialYear, quarter: invalidCase.quarter, typeOfReturn: invalidCase.typeOfReturn}; 

                const apiUrl = `${apiData.baseUrl}${endpoint}`;
                const headers = apiData.headers;
                cy.log('Request Headers:', JSON.stringify(requestData));
                cy.request({
                    method: 'POST',
                    url: apiUrl,
                    headers: headers,
                    body: requestData,
                    failOnStatusCode: false
                }).then((response) => {
                    cy.log('Response Body:', JSON.stringify(response.body));
                    expect(response.status).to.eq(200);

                    cy.log('Reference ID: ' + response.body.referenceId);

                    const expectedErrorMessage = errorCodeToMessage[response.body.responseCode];
                    expect(response.body.responseMessage).to.eq(expectedErrorMessage);
                });
            } else {
                cy.log("Payload not found for API: " + testCase.name);
            }
        });
    });
  });  
});
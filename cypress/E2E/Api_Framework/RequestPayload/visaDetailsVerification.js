/// <reference types="Cypress"/>
import testCases from "../testCases";


describe(`Test Import Export API`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });


    const invalidfirmNameiecNumber = [
        //Invalid firmName and valid iecNumber
        { indianMission: '', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Empty indianMission' },
        { indianMission: 'CHINA@BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Special character @ in indianMission' },
        { indianMission: ' CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Leading space in indianMission' },
        { indianMission: 'CHINA-BEIJING ', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Trailing space in indianMission' },
        { indianMission: 'CHINA-BEI JING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Embedded spaces in indianMission' },
        { indianMission: 'CHINA&BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Special character & in indianMission' },
        { indianMission: 'CHINA#BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Special character # in indianMission' },
        { indianMission: 'CHINA$BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Special character $ in indianMission' },
        { indianMission: 'CHINA^BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Special character ^ in indianMission' },
        { indianMission: 'CHINA*BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Special character * in indianMission' },
        { indianMission: 'CHINA(BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Special character ( in indianMission' },
        { indianMission: 'CHINA)BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Special character ) in indianMission' },
        { indianMission: 'CHINA+BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Special character + in indianMission' },
        { indianMission: 'CHINA=BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Special character = in indianMission' },
        { indianMission: 'CHINA~BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Special character ~ in indianMission' },
        { indianMission: 'CHINA`BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Backtick in indianMission' },
        { indianMission: 'CHINA{BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Special character { in indianMission' },
        { indianMission: 'CHINA}BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Special character } in indianMission' },
        { indianMission: 'CHINA[BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Special character [ in indianMission' },
        { indianMission: 'CHINA]BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Special character ] in indianMission' },
        { indianMission: 'CHINA|BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Special character | in indianMission' },
        { indianMission: 'CHINA\\BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Backslash in indianMission' },
        { indianMission: 'CHINA:BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Colon in indianMission' },
        { indianMission: 'CHINA;BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Semicolon in indianMission' },
        { indianMission: 'CHINA"BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Double quote in indianMission' },
        { indianMission: 'CHINA\'BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Single quote in indianMission' },
        { indianMission: 'CHINA<BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Less-than sign in indianMission' },
        { indianMission: 'CHINA>BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Greater-than sign in indianMission' },
        { indianMission: 'CHINA,BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Comma in indianMission' },
        { indianMission: 'CHINA.BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Period in indianMission' },
        { indianMission: 'CHINA?BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Question mark in indianMission' },
        { indianMission: 'CHINA!BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Exclamation mark in indianMission' },
        { indianMission: undefined, visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Undefined indianMission' },
        { indianMission: 'CHINA\tBEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Tab character in indianMission' },
        { indianMission: 'CHINA\nBEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Newline character in indianMission' },
        { indianMission: Boolean, visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Boolean data type' },
        { indianMission: null, visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Null indianMission' },
        { indianMission: true,visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Boolean true value for indianMission' },
        { indianMission: false, visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Boolean false value for indianMission' },
        { indianMission: 1, visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'number indianMission' },


        //Invalid VisaApplicationID
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB0021362',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Missing one digit in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Extra digit in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB0O213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Letter O instead of zero visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: ' CHNB00213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Leading space in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622 ',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Trailing space in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB0 0213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Embedded space in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622-',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Trailing hyphen in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622/',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Trailing slash in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622#',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Hash sign in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622$',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Dollar sign in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622%',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Percent sign in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622^',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Caret sign in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622&',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Ampersand in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622*',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Asterisk in  visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622(',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Opening parenthesis in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622)',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Closing parenthesis in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622+',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Plus sign in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622=',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Equal sign in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622~',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Tilde in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622`',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Backtick in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622[',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Opening square bracket in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622]',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Closing square bracket in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622{',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Opening curly brace in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622}',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Closing curly brace in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622|',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Vertical bar in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622\\',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Backslash in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622:',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Colon in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622;',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Semicolon in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622\'',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Single quote in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622"',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Double quote in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622<',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Less-than sign in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622>',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Greater-than sign in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622,',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Comma in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622.',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Period in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622?',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Question mark in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622!',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Exclamation mark in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622@',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'At sign in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: undefined,dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Undefined visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: Boolean,dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Boolean data type value for visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00\t213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Tab character in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00\n213622',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Newline character in visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: null,dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'null visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: true,dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Boolean true value visaApplicationId' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: false,dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849', description: 'Boolean false value visaApplicationId' },
        
        //Invalid dateOfBirth test case
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12/09/1984',passportNumber:'PE2191849', description: 'an incorrect date format dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'1984-09-12',passportNumber:'PE2191849', description: 'dd-MMM-yyyy dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12 Sept 1984',passportNumber:'PE2191849', description: '12 Sept 1984 dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'19840912',passportNumber:'PE2191849', description: '19840912 dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'32-Sep-1984',passportNumber:'PE2191849', description: '32-Sep-1984 dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'00-Sep-1984',passportNumber:'PE2191849', description: '00-Sep-1984 dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'29-Feb-1983',passportNumber:'PE2191849', description: '29-Feb-1983 dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'31-Apr-1984',passportNumber:'PE2191849', description: '31-Apr-1984 dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-XXX-1984',passportNumber:'PE2191849', description: '12-XXX-1984 dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-13-1984',passportNumber:'PE2191849', description: '12-13-1984 dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-19845',passportNumber:'PE2191849', description: '12-Sep-19845 dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-0000',passportNumber:'PE2191849', description: '12-Sep-0000 dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12-Sep-3000',passportNumber:'PE2191849', description: '12-Sep-3000 dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'12th September 1984',passportNumber:'PE2191849', description: '12th September 1984 dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:null,passportNumber:'PE2191849', description: 'null dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:undefined,passportNumber:'PE2191849', description: 'Undefined dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:Boolean ,passportNumber:'PE2191849', description: 'Boolean dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:true,passportNumber:'PE2191849', description: 'true dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:false,passportNumber:'PE2191849', description: 'false dateOfBirth' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB00213622',dateOfBirth:'',passportNumber:'PE2191849', description: 'Undefined dateOfBirth' },


        //invalid passport number
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE219184', description: 'Missing one digit in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE21918499', description: 'Extra digit in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:' PE2191849', description: 'Leading space in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849 ', description: 'Trailing space in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE21 91849', description: 'Embedded space in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849-', description: 'Trailing hyphen in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849/', description: 'Trailing slash in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849#', description: 'Hash sign in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849$', description: 'Dollar sign in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849%', description: 'Percent sign in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849^', description: 'Caret sign in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849&', description: 'Ampersand in passportNumber' },

        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849*', description: 'Asterisk in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849(', description: 'Opening parenthesis in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849)', description: 'Closing parenthesis in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849+', description: 'Plus sign in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849=', description: 'Equal sign in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849~', description: 'Tilde in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849`', description: 'Backtick in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849[', description: 'Opening square bracket in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849]', description: 'Closing square bracket in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849{', description: 'Opening curly brace in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849}', description: 'Closing curly brace in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849|', description: 'Vertical bar in passportNumber' },

        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849\\', description: 'Backslash in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849:', description: 'Colon in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849;', description: 'Semicolon in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849\'', description: 'Single quote in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849"', description: 'Double quote in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849<', description: 'Less-than sign in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849>', description: 'Greater-than sign in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849,', description: 'Comma in  passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849.', description: 'Period in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849?', description: 'Question mark in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849!', description: 'Exclamation mark in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE2191849@', description: 'At sign in passportNumber' },

        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:undefined, description: 'Undefined passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:Boolean, description: 'Boolean data type value for passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE219\t1849', description: 'Tab character in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:'PE219\n1849', description: 'Newline character in passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:null, description: 'null passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:true, description: 'Boolean true value passportNumber' },
        { indianMission: 'CHINA-BEIJING', visaApplicationId: 'CHNB002136222',dateOfBirth:'12-Sep-1984',passportNumber:false, description: 'Boolean false value passportNumber' },

 
    
          ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'visa Details Verification');
    filteredTestCases.forEach((testCase) => {
        invalidfirmNameiecNumber.forEach((invalidCase) => {                                                       
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description} indianMission : ${invalidCase.indianMission} visaApplicationID : ${invalidCase.visaApplicationId} dateOfBirth : ${invalidCase.dateOfBirth} and passportNumber : ${invalidCase.passportNumber}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;            
                const requestData = { ...payLoad.requestData, indianMission: invalidCase.indianMission, visaApplicationId: invalidCase.visaApplicationId, dateOfBirth:invalidCase.dateOfBirth,passportNumber:invalidCase.passportNumber }; 

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
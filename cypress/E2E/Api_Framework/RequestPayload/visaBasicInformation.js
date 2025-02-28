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
        { indianMission: '', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Empty indianMission' },
        { indianMission: 'INDONESIA@JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Special character @ in indianMission' },
        { indianMission: ' INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Leading space in indianMission' },
        { indianMission: 'INDONESIA-JAKARTA ', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Trailing space in indianMission' },
        { indianMission: 'INDONESIA-JAKA RTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Embedded spaces in indianMission' },
        { indianMission: 'INDONESIA&JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Special character & in indianMission' },
        { indianMission: 'INDONESIA#JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Special character # in indianMission' },
        { indianMission: 'INDONESIA$JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Special character $ in indianMission' },
        { indianMission: 'INDONESIA^JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Special character ^ in indianMission' },
        { indianMission: 'INDONESIA*JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Special character * in indianMission' },
        { indianMission: 'INDONESIA(JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Special character ( in indianMission' },
        { indianMission: 'INDONESIA)JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Special character ) in indianMission' },
        { indianMission: 'INDONESIA+JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Special character + in indianMission' },
        { indianMission: 'INDONESIA=JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Special character = in indianMission' },
        { indianMission: 'INDONESIA~JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Special character ~ in indianMission' },
        { indianMission: 'INDONESIA`JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Backtick in indianMission' },
        { indianMission: 'INDONESIA{JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Special character { in indianMission' },
        { indianMission: 'INDONESIA}JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Special character } in indianMission' },
        { indianMission: 'INDONESIA[JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Special character [ in indianMission' },
        { indianMission: 'INDONESIA]JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Special character ] in indianMission' },
        { indianMission: 'INDONESIA|JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Special character | in indianMission' },
        { indianMission: 'INDONESIA\\JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Backslash in indianMission' },
        { indianMission: 'INDONESIA:JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Colon in indianMission' },
        { indianMission: 'INDONESIA;JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Semicolon in indianMission' },
        { indianMission: 'INDONESIA"JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Double quote in indianMission' },
        { indianMission: 'INDONESIA\'JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Single quote in indianMission' },
        { indianMission: 'INDONESIA<JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Less-than sign in indianMission' },
        { indianMission: 'INDONESIA>JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Greater-than sign in indianMission' },
        { indianMission: 'INDONESIA,JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Comma in indianMission' },
        { indianMission: 'INDONESIA.JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Period in indianMission' },
        { indianMission: 'INDONESIA?JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Question mark in indianMission' },
        { indianMission: 'INDONESIA!JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Exclamation mark in indianMission' },
        { indianMission: undefined, visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Undefined indianMission' },
        { indianMission: 'INDONESIA\JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Tab character in indianMission' },
        { indianMission: 'INDONESIA\JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Newline character in indianMission' },
        { indianMission: Boolean, visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Boolean data type' },
        { indianMission: null, visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Null indianMission' },
        { indianMission: true,visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Boolean true value for indianMission' },
        { indianMission: false, visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Boolean false value for indianMission' },
        { indianMission: 1, visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'number indianMission' },


        //Invalid VisaApplicationID
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A1',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Missing one digit in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A188',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Extra digit in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJVO234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Letter O instead of zero visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: ' IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Leading space in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18 ',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Trailing space in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV 0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Embedded space in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18-',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Trailing hyphen in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18/',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Trailing slash in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18#',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Hash sign in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18$',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Dollar sign in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18%',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Percent sign in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18^',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Caret sign in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18&',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Ampersand in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18*',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Asterisk in  visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18(',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Opening parenthesis in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18)',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Closing parenthesis in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18+',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Plus sign in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18=',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Equal sign in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18~',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Tilde in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18`',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Backtick in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18[',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Opening square bracket in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18]',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Closing square bracket in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18{',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Opening curly brace in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18}',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Closing curly brace in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18|',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Vertical bar in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18\\',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Backslash in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18:',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Colon in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18;',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Semicolon in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18\'',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Single quote in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18"',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Double quote in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18<',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Less-than sign in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18>',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Greater-than sign in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18,',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Comma in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18.',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Period in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18?',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Question mark in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18!',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Exclamation mark in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18@',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'At sign in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: undefined,dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Undefined visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: Boolean,dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Boolean data type value for visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0\t234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Tab character in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV02\n34A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Newline character in visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: null,dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'null visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: true,dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Boolean true value visaApplicationId' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: false,dateOfBirth:'14-Jan-1994',passportNumber:'B6132655', description: 'Boolean false value visaApplicationId' },
        
        //Invalid dateOfBirth test case
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14/01/1994',passportNumber:'B6132655', description: 'an incorrect date format dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'1994-01-01',passportNumber:'B6132655', description: 'dd-MMM-yyyy dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14 Jan 1994',passportNumber:'B6132655', description: '12 Sept 1984 dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'19940114',passportNumber:'B6132655', description: '19840912 dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'32-Jan-1994',passportNumber:'B6132655', description: '32-Sep-1984 dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'00-Jan-1994',passportNumber:'B6132655', description: '00-Sep-1984 dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'29-Feb-1994',passportNumber:'B6132655', description: '29-Feb-1983 dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'31-Apr-1994',passportNumber:'B6132655', description: '31-Apr-1984 dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-XXX-1994',passportNumber:'B6132655', description: '12-XXX-1984 dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-13-1994',passportNumber:'B6132655', description: '12-13-1984 dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-19945',passportNumber:'B6132655', description: '12-Sep-19845 dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-0000',passportNumber:'B6132655', description: '12-Sep-0000 dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-3000',passportNumber:'B6132655', description: '12-Sep-3000 dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14th January 1994',passportNumber:'B6132655', description: '12th September 1984 dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:null,passportNumber:'B6132655', description: 'null dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:undefined,passportNumber:'B6132655', description: 'Undefined dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:Boolean ,passportNumber:'B6132655', description: 'Boolean dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:true,passportNumber:'B6132655', description: 'true dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:false,passportNumber:'B6132655', description: 'false dateOfBirth' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'',passportNumber:'B6132655', description: 'Undefined dateOfBirth' },


        //invalid passport number
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B613265', description: 'Missing one digit in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B61326555', description: 'Extra digit in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:' B6132655', description: 'Leading space in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655 ', description: 'Trailing space in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B613 2655', description: 'Embedded space in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655-', description: 'Trailing hyphen in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655/', description: 'Trailing slash in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655#', description: 'Hash sign in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655$', description: 'Dollar sign in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655%', description: 'Percent sign in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655^', description: 'Caret sign in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655&', description: 'Ampersand in passportNumber' },

        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655*', description: 'Asterisk in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655(', description: 'Opening parenthesis in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655)', description: 'Closing parenthesis in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655+', description: 'Plus sign in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655=', description: 'Equal sign in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655~', description: 'Tilde in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655`', description: 'Backtick in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655[', description: 'Opening square bracket in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655]', description: 'Closing square bracket in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655{', description: 'Opening curly brace in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655}', description: 'Closing curly brace in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655|', description: 'Vertical bar in passportNumber' },

        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655\\', description: 'Backslash in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655:', description: 'Colon in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655;', description: 'Semicolon in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655\'', description: 'Single quote in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655"', description: 'Double quote in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655<', description: 'Less-than sign in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655>', description: 'Greater-than sign in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655,', description: 'Comma in  passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655.', description: 'Period in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655?', description: 'Question mark in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655!', description: 'Exclamation mark in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B6132655@', description: 'At sign in passportNumber' },

        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:undefined, description: 'Undefined passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:Boolean, description: 'Boolean data type value for passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B613\t2655', description: 'Tab character in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:'B613\n2655', description: 'Newline character in passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:null, description: 'null passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:true, description: 'Boolean true value passportNumber' },
        { indianMission: 'INDONESIA-JAKARTA', visaApplicationId: 'IDNJV0234A18',dateOfBirth:'14-Jan-1994',passportNumber:false, description: 'Boolean false value passportNumber' },

 
    
          ];


    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.'
    };


    const filteredTestCases = testCases.filter(testCase => testCase.name === 'visa Basic Information');
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
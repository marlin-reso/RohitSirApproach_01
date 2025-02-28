/// <reference types="Cypress"/>
import testCases from "../testCases";

describe(`Test Shop And Establishment Data Fetch API of Karnataka`, () => {
    let apiData;
    before(function() {
        cy.fixture('apiData').then((data) => {
            apiData = data;
        });
    });

    const invalidCertificateNumberState = [
        { certificateNumber: '6/106/CE/1947/2011@#', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Special characters at the end' },
        { certificateNumber: '6/106/CE/1947/2011*', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Special character at the end' },
        { certificateNumber: '6/106/CE/1947/2@11', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Special character in the middle' },
        { certificateNumber: '6/106/CE/1947/2*11', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Special character in the middle' },
        { certificateNumber: '6/106/CE/1947 2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Whitespace in the middle' },
        { certificateNumber: '6/106/CE/1947_2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Underscore in the middle' },
        { certificateNumber: '6/106/CE/1947-2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Hyphen in the middle' },
        { certificateNumber: '6/106/CE/1947/2A11', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Alphabetic character in the middle' },
        { certificateNumber: 'A/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Alphabetic character at the start' },
        { certificateNumber: '6/106/CE/1947/2011A', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Alphabetic character at the end' },
        { certificateNumber: '6/106/CE/194/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Short certificate number' },
        { certificateNumber: '6/106/CE/1947/201', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Very short certificate number' },
        { certificateNumber: 'ABCDEFGHIJ', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'All alphabetic characters' },
        { certificateNumber: '6#/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Special character in the prefix' },
        { certificateNumber: '6/106!CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Special character in the middle' },
        { certificateNumber: '', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Empty certificate number' },
        { certificateNumber: '6/106/CE/1947/2011O', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Letter "O" instead of zero' },
        { certificateNumber: '6/106/CE/1947/O011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Letter "O" instead of zero in the middle' },
        { certificateNumber: undefined, establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Undefined certificate number' },
        { certificateNumber: Boolean, establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Boolean certificate number' },
        { certificateNumber: null, establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Null certificate number' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: '', description: 'Empty state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: undefined, description: 'Undefined state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: true, description: 'Boolean state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'M H', description: 'Valid state' },
        { certificateNumber: '6/106/CE/1947/2011@', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Special character at the end' },
        { certificateNumber: '6/106/CE/1947/2011*', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Special character at the end' },
        { certificateNumber: '6/106/CE/1947/2@11', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Special character in the middle' },
        { certificateNumber: '6/106/CE/1947/2*11', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Special character in the middle' },
        { certificateNumber: '6/106/CE/1947 2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Whitespace in the middle' },
        { certificateNumber: '6/106/CE/1947_2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Underscore in the middle' },
        { certificateNumber: '6/106/CE/1947-2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Hyphen in the middle' },
        { certificateNumber: '6/106/CE/1947/2A11', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Alphabetic character in the middle' },
        { certificateNumber: 'A/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Alphabetic character at the start' },
        { certificateNumber: '6/106/CE/1947/2011A', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Alphabetic character at the end' },
        { certificateNumber: '6/106/CE/194/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Short certificate number' },
        { certificateNumber: '6/106/CE/1947/201', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Very short certificate number' },
        { certificateNumber: 'ABCDEFGHIJ', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'All alphabetic characters' },
        { certificateNumber: '6#/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Special character in the prefix' },
        { certificateNumber: '6/106!CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Special character in the middle' },
        { certificateNumber: '', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Empty certificate number' },
        { certificateNumber: '6/106/CE/1947/2011O', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Letter "O" instead of zero' },
        { certificateNumber: '6/106/CE/1947/O011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Letter "O" instead of zero in the middle' },
        { certificateNumber: undefined, establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Undefined certificate number' },
        { certificateNumber: null, establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Null certificate number' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: '', description: 'Empty state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: undefined, description: 'Undefined state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: true, description: 'Boolean state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'M H', description: 'Valid state' },
        { certificateNumber: '6#106#CE#1947#2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Using "#" instead of "/" in certificateNumber' },
        { certificateNumber: '6@106@CE@1947@2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Using "@" instead of "/" in certificateNumber' },
        { certificateNumber: '6_106_CE_1947_2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Using "_" instead of "/" in certificateNumber' },
        { certificateNumber: '6-106-CE-1947-2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Using "-" instead of "/" in certificateNumber' },
        { certificateNumber: '6.106.CE.1947.2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Using "." instead of "/" in certificateNumber' },
        { certificateNumber: '6$106$CE$1947$2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Using "$" instead of "/" in certificateNumber' },
        { certificateNumber: '6*106*CE*1947*2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Using "*" instead of "/" in certificateNumber' },    
        { certificateNumber: true, establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'DL', description: 'bolean true certificate number' },
        { certificateNumber: false, establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'DL', description: 'bolean false certificate number' },
        { certificateNumber: true, establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Boolean certificate number' },
        { certificateNumber: false, establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'KR', description: 'Boolean certificate number' },
    


        //invalid establishmentName and valid certificateNumber and state
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: '', state: 'KR', description: 'Empty establishmentName' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: '   ', state: 'KR', description: 'Whitespace only in establishmentName' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE', state: 'KR', description: 'Partial name without "PRIVATE LIMITED"' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PVT LTD', state: 'KR', description: 'Abbreviated "PRIVATE" in establishmentName' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s 12345678901234567890123456789012345678901234567890', state: 'KR', description: 'Very long establishmentName' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: '!@#$%^&*', state: 'KR', description: 'Special characters only in establishmentName' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE 123', state: 'KR', description: 'Numbers included in establishmentName' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART_PROF&^%$', state: 'KR', description: 'Special characters in establishmentName' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: null, state: 'KR', description: 'Null establishmentName' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: undefined, state: 'KR', description: 'Undefined establishmentName' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: Boolean, state: 'KR', description: 'Boolean establishmentName' },
        { certificateNumber: '2014001086', establishmentName: true, state: 'KR', description: 'bolean true Establishment Name' },
        { certificateNumber: '2014001086', establishmentName: false, state: 'KR', description: 'bolean false Establishment Name' },    
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 123456, state: 'KR', description: 'Numeric establishmentName' },
    
        //invalid state and valid certificateNumber and establishmentName
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'R@', description: 'Special character in state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'm#', description: 'Special character in state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'p$', description: 'Special character in state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'x%', description: 'Special character in state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 't&', description: 'Special character in state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: '1r', description: 'Numeric character in state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 's2', description: 'Numeric character in state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: '3b', description: 'Numeric character in state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: '4k', description: 'Numeric character in state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: '5m', description: 'Numeric character in state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'rJ12', description: 'Too long alphanumeric state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'a1b2', description: 'Alphanumeric state code too long' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'x5y7', description: 'Alphanumeric state code too long' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'DELH', description: 'State code too long' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'RAJAST', description: 'State code too long' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'a', description: 'Single character state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'W b', description: 'Embedded spaces in state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'M_h', description: 'Underscore in state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 't-n', description: 'Hyphen in state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: ' wb', description: 'Leading space in state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'mh ', description: 'Trailing space in state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: ' tn ', description: 'Leading and trailing spaces in state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: ' gj ', description: 'Leading and trailing spaces in state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: '', description: 'Empty state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: undefined, description: 'Undefined state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: Boolean, description: 'Boolean state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 11, description: 'Number state code' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: null, description: 'null state code' },
        { certificateNumber: '2014001086', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: true, description: 'bolean true state' },
        { certificateNumber: '2014001086', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: false, description: 'bolean false state' },
    

        // invalid certificateNumber and establishmentName valid state
        { certificateNumber: '6//CE/1947/2011', establishmentName: 'M/s SMART PRO FORCE PRIVATE LTD', state: 'kr', description: 'Missing parts in certificate number, spaces in establishment name' },
        { certificateNumber: '6/10*/CE/1947/2011', establishmentName: 'M/s SMART#PROFORCE', state: 'kr', description: 'Special characters in both certificate number and establishment name' },
        { certificateNumber: '6/106/CE/1 47/2011', establishmentName: 'M/s SMART PROFORCE PVT_LTD', state: 'kr', description: 'Embedded space in certificate number, underscore in establishment name' },
        { certificateNumber: '6/106/CE/1947-2011', establishmentName: 'SMART-PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Hyphen in certificate number, missing prefix in establishment name' },
        { certificateNumber: '6/106/CE/1947\\2011', establishmentName: 'M/s SMART\\PROFORCE', state: 'kr', description: 'Backslash in certificate number and establishment name' },
        { certificateNumber: '6106/CE/1947/2011', establishmentName: 'SMART PROFORCE PRIVATE LTD', state: 'kr', description: 'Missing separator in certificate number, missing prefix in establishment name' },
        { certificateNumber: '/106/CE/1947/2011', establishmentName: '/SMART PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Leading slash in both certificate number and establishment name' },
        { certificateNumber: '6/106/CE/1947/', establishmentName: 'M/s SMART PROFORCE', state: 'kr', description: 'Trailing slash in certificate number, missing suffix in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011_', establishmentName: 'M/s SMART_PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Trailing underscore in certificate number, underscore in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011.', establishmentName: 'M/s SMART.PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Trailing period in certificate number, period in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011,', establishmentName: 'M/s SMART,PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Trailing comma in certificate number, comma in establishment name' },
        { certificateNumber: '6/106/CE/19 7/2011', establishmentName: 'SMART PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Embedded space in certificate number, missing prefix in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011+', establishmentName: 'M/s SMART+PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Trailing plus sign in certificate number, plus sign in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011=', establishmentName: 'M/s SMART=PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Trailing equal sign in certificate number, equal sign in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011~', establishmentName: 'M/s SMART~PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Trailing tilde in certificate number, tilde in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011`', establishmentName: 'M/s SMART`PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Trailing backtick in certificate number, backtick in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011$', establishmentName: 'M/s SMART$PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Trailing dollar sign in certificate number, dollar sign in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011%', establishmentName: 'M/s SMART%PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Trailing percent sign in certificate number, percent sign in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011^', establishmentName: 'M/s SMART^PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Trailing caret in certificate number, caret in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011&', establishmentName: 'M/s SMART&PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Trailing ampersand in certificate number, ampersand in establishment name' },
        { certificateNumber: null, establishmentName: null, state: 'kr', description: 'null certificate number and establishment name' },
        { certificateNumber: "", establishmentName: "", state: 'kr', description: 'blank string certificate number and establishment name' },
        { certificateNumber: undefined, establishmentName: undefined, state: 'kr', description: 'Undefined certificate number and establishment name' },
        { certificateNumber: Boolean, establishmentName: Boolean, state: 'kr', description: 'Boolean values for certificate number and establishment name' },


        // invalid establishmentName and state and valid certificateNumber 
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PRO FORCE PRIVATE LTD', state: 'kr', description: 'Spaces in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART#PROFORCE', state: 'kr', description: 'Special characters in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART_PROFORCE PVT_LTD', state: 'kr', description: 'Underscore in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'SMART-PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Hyphen in establishment name, missing prefix' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART\\PROFORCE', state: 'kr', description: 'Backslash in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'SMART PROFORCE PRIVATE LTD', state: 'kr', description: 'Missing prefix in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: '/SMART PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Leading slash in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE', state: 'kr', description: 'Missing suffix in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART_PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Underscore in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART.PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Period in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART,PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Comma in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'SMART PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Missing prefix in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART+PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Plus sign in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART=PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Equal sign in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART~PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Tilde in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART`PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Backtick in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART$PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Dollar sign in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART%PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Percent sign in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART^PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Caret in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART&PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Ampersand in establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: null, state: 'kr', description: 'Null establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: '', state: 'kr', description: 'Empty string for establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: undefined, state: 'kr', description: 'Undefined establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: Boolean, state: 'kr', description: 'Boolean value for establishment name' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE', state: 'kr-', description: 'Hyphen in state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE', state: 'kr$', description: 'Dollar sign in state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE', state: 'k1', description: 'Numeric character in state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE', state: 'k@', description: 'Special character in state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE', state: 'a1b2', description: 'Alphanumeric state with too many characters' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE', state: ' p', description: 'Leading space in state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE', state: 'p ', description: 'Trailing space in state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE', state: 'w b', description: 'Embedded space in state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE', state: 'tn_', description: 'Underscore in state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE', state: 'kr.', description: 'Period in state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE', state: 'kr*', description: 'Asterisk in state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE', state: null, description: 'Null state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE', state: '', description: 'Empty string for state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE', state: undefined, description: 'Undefined state' },
        { certificateNumber: '6/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE', state: Boolean, description: 'Boolean value for state' },
    

        // invalid certificateNumber and state valid establishmentName
        { certificateNumber: '6//CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'k$', description: 'Missing parts in certificate number, special character in state' },
        { certificateNumber: '6/10*/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'k1', description: 'Special character in certificate number, numeric character in state' },
        { certificateNumber: '6/106/CE/1 47/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'p ', description: 'Embedded space in certificate number, trailing space in state' },
        { certificateNumber: '6/106/CE/1947-2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'tn_', description: 'Hyphen in certificate number, underscore in state' },
        { certificateNumber: '6/106/CE/1947\\2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'w b', description: 'Backslash in certificate number, embedded space in state' },
        { certificateNumber: '6106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'a1b2', description: 'Missing separator in certificate number, alphanumeric state with too many characters' },
        { certificateNumber: '/106/CE/1947/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'kr-', description: 'Leading slash in certificate number, hyphen in state' },
        { certificateNumber: '6/106/CE/1947/', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'k@', description: 'Trailing slash in certificate number, special character in state' },
        { certificateNumber: '6/106/CE/1947/2011_', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'kr*', description: 'Trailing underscore in certificate number, asterisk in state' },
        { certificateNumber: '6/106/CE/1947/2011.', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'kr.', description: 'Trailing period in certificate number, period in state' },
        { certificateNumber: '6/106/CE/1947/2011,', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'kr,', description: 'Trailing comma in certificate number, comma in state' },
        { certificateNumber: '6/106/CE/19 7/2011', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'kr ', description: 'Embedded space in certificate number, trailing space in state' },
        { certificateNumber: '6/106/CE/1947/2011+', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'kr+', description: 'Trailing plus sign in certificate number, plus sign in state' },
        { certificateNumber: '6/106/CE/1947/2011=', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'kr=', description: 'Trailing equal sign in certificate number, equal sign in state' },
        { certificateNumber: '6/106/CE/1947/2011~', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'kr~', description: 'Trailing tilde in certificate number, tilde in state' },
        { certificateNumber: '6/106/CE/1947/2011`', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'kr`', description: 'Trailing backtick in certificate number, backtick in state' },
        { certificateNumber: '6/106/CE/1947/2011$', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'kr$', description: 'Trailing dollar sign in certificate number, dollar sign in state' },
        { certificateNumber: '6/106/CE/1947/2011%', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'kr%', description: 'Trailing percent sign in certificate number, percent sign in state' },
        { certificateNumber: '6/106/CE/1947/2011^', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'kr^', description: 'Trailing caret in certificate number, caret in state' },
        { certificateNumber: '6/106/CE/1947/2011&', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'kr&', description: 'Trailing ampersand in certificate number, ampersand in state' },
        { certificateNumber: '6/106/CE/1947/2011&', establishmentName: null, state: 'kr', description: 'Null establishmentName' },
        { certificateNumber: '6/106/CE/1947/2011&', establishmentName: '', state: 'kr', description: 'Empty string for establishmentName' },
        { certificateNumber: '6/106/CE/1947/2011&', establishmentName: undefined, state: 'kr', description: 'Undefined establishmentName' },
        { certificateNumber: '6/106/CE/1947/2011&', establishmentName: Boolean, state: 'kr', description: 'Boolean value for establishmentName' },
        { certificateNumber: null, establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Null certificate number' },
        { certificateNumber: '', establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Empty string for certificate number' },
        { certificateNumber: undefined, establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Undefined certificate number' },
        { certificateNumber: Boolean, establishmentName: 'M/s SMART PROFORCE PRIVATE LIMITED', state: 'kr', description: 'Boolean value for certificate number' },
        { certificateNumber: 1234567, establishmentName: Boolean, state: 'kr', description: 'number value for certificate number' },
        { certificateNumber: '6/106/CE/1947/2011&', establishmentName: 1234, state: 'kr', description: 'number value for establishmentName' },

        // invalid certificateNumber, state and establishmentName 
        { certificateNumber: '6/CE/1947/2011', establishmentName: '', state: 'k$', description: 'Incomplete certificate number, empty establishment name, special character in state' },
        { certificateNumber: '6/10/1947/2011', establishmentName: 'M/s SMART_PROFORCE', state: 'k1', description: 'Missing component in certificate number, underscore in establishment name, numeric character in state' },
        { certificateNumber: '6/106//1947/2011', establishmentName: 'M/s SMART#PROFORCE', state: 'kr-', description: 'Missing component in certificate number, special character in establishment name, hyphen in state' },
        { certificateNumber: '6/106/CE/19 7', establishmentName: 'M/s SMART-PROFORCE', state: 'kr@', description: 'Incomplete certificate number, hyphen in establishment name, special character in state' },
        { certificateNumber: '6/106/CE/1947/2@11', establishmentName: 'SMART PROFORCE PVT LTD', state: 'w b', description: 'Special character in certificate number, missing prefix in establishment name, embedded space in state' },
        { certificateNumber: '/106/CE/1947/20 1', establishmentName: 'M/s SMART PRO FORCE', state: ' p', description: 'Leading slash in certificate number, embedded space in establishment name, leading space in state' },
        { certificateNumber: '6/106/CE/1947/2011\\', establishmentName: 'SMART PROFORCE PRIVATE LIMITED', state: 'p ', description: 'Trailing backslash in certificate number, missing prefix in establishment name, trailing space in state' },
        { certificateNumber: '6/106/CE/1947/2011,', establishmentName: 'M/s SMART+PROFORCE', state: 'kr.', description: 'Trailing comma in certificate number, special character in establishment name, period in state' },
        { certificateNumber: '6/106/CE/1947/2011=', establishmentName: '/SMART PROFORCE PRIVATE LIMITED', state: 'tn_', description: 'Trailing equal sign in certificate number, leading slash in establishment name, underscore in state' },
        { certificateNumber: '6/106/CE/1947/2011+', establishmentName: 'M/s SMART=PROFORCE PRIVATE LTD', state: 'k*', description: 'Trailing plus sign in certificate number, special character in establishment name, asterisk in state' },
        { certificateNumber: '6106/CE/1947/2011', establishmentName: 'M/s SMART&PROFORCE', state: 'kr$', description: 'Missing separator in certificate number, special character in establishment name, dollar sign in state' },
        { certificateNumber: '6/106/CE/1947/20*1', establishmentName: 'M/s SMART.PROFORCE', state: 'k1', description: 'Special character in certificate number, period in establishment name, numeric character in state' },
        { certificateNumber: '6/106/CE/1947/20 1', establishmentName: 'M/s SMART,PROFORCE', state: 'kr_', description: 'Embedded space in certificate number, comma in establishment name, underscore in state' },
        { certificateNumber: '6/106/CE/1947/2011.', establishmentName: 'M/s SMART PROFORCE', state: 'kr,', description: 'Trailing period in certificate number, missing suffix in establishment name, comma in state' },
        { certificateNumber: '6/106/CE/1947/2011$', establishmentName: 'M/s SMART_PROFORCE PRIVATE LIMITED', state: 'a1b2', description: 'Trailing dollar sign in certificate number, underscore in establishment name, alphanumeric state with too many characters' },
        { certificateNumber: '6/106/CE/1947/2011%', establishmentName: 'M/s SMART~PROFORCE', state: 'k+', description: 'Trailing percent sign in certificate number, special character in establishment name, plus sign in state' },
        { certificateNumber: '6/106/CE/1947/2011^', establishmentName: 'M/s SMART`PROFORCE', state: 'kr=', description: 'Trailing caret in certificate number, special character in establishment name, equal sign in state' },
        { certificateNumber: '6/106/CE/1947/2011&', establishmentName: 'M/s SMART_PROFORCE', state: 'kr~', description: 'Trailing ampersand in certificate number, underscore in establishment name, tilde in state' },
        { certificateNumber: null, establishmentName: 'M/s SMART$PROFORCE', state: 'kr%', description: 'Null certificate number, special character in establishment name, percent sign in state' },
        { certificateNumber: '', establishmentName: 'M/s SMART PROFORCE', state: 'kr^', description: 'Empty string for certificate number, missing suffix in establishment name, caret in state' },
        { certificateNumber: undefined, establishmentName: 'M/s SMART~PROFORCE PRIVATE LTD', state: 'kr&', description: 'Undefined certificate number, special character in establishment name, ampersand in state' },
        { certificateNumber: true, establishmentName: 'M/s SMART`PROFORCE PRIVATE LTD', state: 'kr*', description: 'Boolean value for certificate number, special character in establishment name, asterisk in state' },
        { certificateNumber: false, establishmentName: 'M/s SMART$PROFORCE PRIVATE LTD', state: 'kr+', description: 'Boolean value for certificate number, special character in establishment name, plus sign in state' },
        { certificateNumber: '6/106/CE/1947/2011`', establishmentName: null, state: 'kr$', description: 'Trailing backtick in certificate number, null establishment name, dollar sign in state' },
        { certificateNumber: '6/106/CE/1947/2011$', establishmentName: '', state: 'kr&', description: 'Trailing dollar sign in certificate number, empty string for establishment name, ampersand in state' },
        { certificateNumber: '6/106/CE/1947/2011%', establishmentName: undefined, state: 'kr^', description: 'Trailing percent sign in certificate number, undefined establishment name, caret in state' },
        { certificateNumber: '6/106/CE/1947/2011^', establishmentName: true, state: 'kr*', description: 'Trailing caret in certificate number, boolean value for establishment name, asterisk in state' },
        { certificateNumber: '6/106/CE/1947/2011&', establishmentName: false, state: 'kr+', description: 'Trailing ampersand in certificate number, boolean value for establishment name, plus sign in state' }
    ];

    const errorCodeToMessage = {
        'EBF017': 'Blank Input Field.',
        'EIP018': 'Incorrect Input.',
        'ENI004': 'No Information Found.',
        'EPI022': 'Payload is Incorrect.'        
    };

    const filteredTestCases = testCases.filter(testCase => testCase.name === 'Shop And Establishment Data Fetch of Karnataka');
    filteredTestCases.forEach((testCase) => {
        invalidCertificateNumberState.forEach((invalidCase) => {                                                        
           it(`Verify the ${testCase.name} API when provided ${invalidCase.description}, Certificate Number : ${invalidCase.certificateNumber}, Establishment Name : ${invalidCase.establishmentName}  and State : ${invalidCase.state}`, () => {
    
            const payLoad = Object.values(apiData.testCases).find(tc => tc.apiName === testCase.name);
            if (payLoad) {
                const apiName = payLoad.apiName;
                const endpoint = payLoad.endpoint;              
                const requestData = { ...payLoad.requestData, certificateNumber: invalidCase.certificateNumber, establishmentName:invalidCase.establishmentName ,state: invalidCase.state}; 

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
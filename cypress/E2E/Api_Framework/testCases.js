const testCases = [
    {
        name: 'Aadhaar Verifier',
    },
    {
        name: 'Udyam Registration',
    },
    {
        name: 'PAN Details Info',
    },
    {
        name: 'PAN Data Fetch',
    },
    {
        name: 'Passport',
    },
    {
        name: 'Voter Card Verification',
    },
    {
        name: 'Shop And Establishment Data Fetch of West Bengal',
    },
    {
        name: 'Shop And Establishment Data Fetch of Delhi',
    },
    {
        name: 'Shop And Establishment Data Fetch of Telangana',
    },
    {
        name: 'Shop And Establishment Data Fetch of Jharkhand',
    },
    {
        name: 'Shop And Establishment Data Fetch of Rajasthan',
    },
    {
        name: 'Shop And Establishment Data Fetch of Karnataka',
    },
    {
        name: 'Vehicle Registration Data Fetch',
    },
    {
        name: 'Bank Account Verification',
    },
    {
        name: 'Utility Electricity Check',
    },
    {
        name: 'Udyog Aadhaar Verification',
    },
    {
        name: 'CA Membership Verification',
    },
    {
        name: 'Import Export Verification',
    },
    {
        name: 'SEBI Entity Verification',
    },
    {
        name: 'FDA License Verification',
    },
    {
        name: 'EPF Enterprise Verification',
    },
    {
        name: 'ICSI Membership Verification ACS',
    },
    {
        name: 'ICSI Membership Verification FCS',
    },
    {
        name: 'FSSAI License Verification',
    },
    {
        name: 'ICMAI Membership Verification',
    },
    {
        name: 'Pan Aadhaar link',
    },
    {
        name: 'LEI Search',
    },
    {
        name: 'LEI Details Lei Number Search',
    },
    {
        name: 'LEI Details Entity Name Search',
    },
    {
        name: 'ESIC Employer Details',
    },    
    {
        name: 'EPF verifier Get All Employee Names',
    },    
    {
        name: 'EPF verifier Enterprise',
    },    
    {
        name: 'Bullion Rates',
    },    
    {
        name: 'Driving License Details',
    },    
    {
        name: 'Anti Money Laundering detail- Entity',
    },
    {
        name: 'Anti Money Laundering detail- Individual',
    },    
    {
        name: 'PAN Verification V2',
    },    
    {
        name: 'MCI Membership Verification',
    },    
    {
        name: 'Fetch Vehicle details',
    },    
    {
        name: 'Fetch all car details list',
    },    
    {
        name: 'All city and state name list',
    },        
    {
        name: 'ESIC Employee Details',
    },        
    {
        name: 'ESIC Employer Search',
    },           
    {
        name: 'Aadhaar OTP Verification',
    },
    {
        name: 'Utility - Phone Number Details',
    },           
    {
        name: 'Udyam OTP Verification',
    },                      
    {
        name: 'EPFO Passbook Details',
    },           
    {
        name: 'EPFO Retail Data Fetch',
    },           
    {
        name: 'UDIN OTP Verification',
    },   
    {
        name: 'Udyam Registration Certificate',
    }, 
    {
        name: 'Form-16-verification',
    },
    {
        name: 'Mgnrega Card Details',
    },
    {
        name:'Pan to father name',
    },
    {
        name: 'Pan to udyam Info',
    },
    {
        name: 'png Details',
    }, 
    {
        name: 'pan To Masked Aadhaar',
    },
    {
        name: 'PAN basic info',
    },
    {
        name: 'Get pin code details',
    },
    {
        name: 'ifsc Code Verification',
    },
    {
        name: 'Aadhaar document upload',
    },
    {
        name: 'Driveing Licence document upload request',
    },
    {
        name: 'Pan document upload',
    },
    {
        name: 'Passport document upload',
    },
    {
        name: 'VoterID document upload'
    },
    {
        name: 'visa Details Verification',
    },
    {
        name: 'visa Basic Information',
    },
    {
        name: 'pan advance informaton',
    },
    {
        name: 'employee company verification',
    },
    {
        name: 'pan to cin',
    },
    {
        name: 'tds return verification',
    },
    {
        name: 'pin code verification',
    },
    {
        name: 'utility dth details',
    },
    {
        name: 'utility broadband verification',
    },
    {
        name: 'domain verification',
    },
    {
        name: 'email verification',
    },
    {
        name: 'e-Challan Verification',
    },
    {
        name: 'employment verification',
    },
    {
        name: 'pan to din',
    },
    {
        name: 'phone basic information',
    },
    {
        name: 'phone to uan verification',
    },
    {
        name: 'phone to dl verification',
    },
    {
        name: 'phone to rc',
    },
    {
        name: 'reverse rc',
    },
    {
        name: 'tan verification',
    },
    {
        name: 'upi id basic information',
    },
    {
        name: 'Bank Account Verification Pennyless',
    },
    {
        name: 'Phone to pan verification',
    },
    {
        name: 'Upload image match percentage',
    },
    {
        name : 'Social attribute verification',
    },
    {
        name : 'Delhi jal board',
    },
    {
        name : 'HARYANA URBAN DEVELOPMENT AUTHORITY',
    },
    {
        name : 'HYDERABAD METROPOLITAN WATER SUPPLY AND SEWERAGE BOARD',
    },
    {
        name : 'KERALA WATER AUTHORITY',
    },
    {
        name : 'BRIHANMUMBAI MUNICIPAL CORPORATION',
    },
    {
        name : 'UTTARAKHAND JAL SANSTHAN',
    },
    {
        name : 'CHENNAI METROPOLITAN WATER SUPPLY AND SEWERAGE BOARD',
    },
    {
        name : 'JAMMU KASHMIR WATER BILLING',
    },
    {
        name : 'PIMPRI CHINCHWAD MUNICIPAL CORPORATION',
    },
    {
        name : 'NOIDA JAL',
    },
    {
        name : 'NEW DELHI MUNICIPAL COUNCIL',
    },
    {
        name : 'TALEGAON DABHADE NAGAR PARISHAD',
    },
    {
        name : 'Name match entity',
    },
    {
        name : 'Name match individual',
    },
    {
        name : 'Utility electric details',
    },
    {
        name : 'Utility electric details citywise',
    },
    {
        name : 'Utility lpg details bharat gas',
    },
    {
        name : 'Utility lpg details indane gas',
    },
    {
        name : 'Verify mobile number',
    },
    {
        name : 'ration card verification',
    },
    {
        name : 'Udyam Assist Verification',
    },
    {
        name : 'pan To UAN Verification',
    },
    {
        name : 'initiate liveliness',
    },
    {
        name : 'IP address verification',
    },
    {
        name : 'Death certification verification',
    },
    {
        name : 'Verify Email',
    },
    {
        name : 'Fetch car dealer details',
    },
    {
        name : 'fetch Two Wheeler Vehicle Details',
    }

    
];

export default testCases;
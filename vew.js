window.myDebugInterpretations = null; // For debugging in console

document.addEventListener('DOMContentLoaded', function() {
    // House to button text mapping
    const houseButtons = {
        'houseNine': 'Wish or First Move',
        'houseTen': 'Success Or Undertaking',
        'houseEleven': 'Gain or Lose',
        'houseTwelve': 'Foreign Land',
        'houseThirten': 'Stranger or Favor',
        'houseFourten': 'Property or Theft',
        'houseFiften': 'Friend or Dealings',
        'houseSixten': 'Short Travel',
        'houseFive': 'Love and Regard',
        'houseSix': 'Marriage',
        'houseSeven': 'Wife or Husband',
        'houseEight': 'Son or Daugther',
        'houseThree': 'Illness',
        'houseFour': 'Prisoner',
        'houseTwo': 'Lucky or Unlucky',
        'houseOne': 'Dreams'
    };

    // Reverse mapping for easy lookup
    const buttonHouses = {};
    for (const [house, buttonText] of Object.entries(houseButtons)) {
        buttonHouses[buttonText] = house;
    }

    // ALL INTERPRETATIONS IN ONE PLACE
    const interpretations = {
        'Wish or First Move': {
            '••••': 'What you wish for, will they be obtained.',
            '-•-•': 'Whatever your desires are for the present, decline them.',
            '•-••': 'If your desires are not extravagant, they would be granted.',
            '-••-': 'After your intention, else you may meet poverty and disaster.',
            '---•': 'You will obtain your wishes by means of a friend.',
            '--•-': 'your wishes is in vain at present.',
            '-•••': 'No.',
            '--••': 'You will obtain what you wish for.',
            '••--': 'You will succeed as you desire.',
            '•••-': 'Change your intensions and you will do well.',
            '-•--': 'You will succeed according to your wishes.',
            '•---': 'Whatever your desires are, you will speedily obtain them.',
            '•--•': 'Rejoice ever at that wish ordained for you.',
            '••-•': 'Your hope in vain. Fortunes shuns you at present.',
            '•-•-': 'What you wish, will granted to you.',
            '----': 'Make yourself content for your present fortune.'
        },
        'Success Or Undertaking': {
            '••••': 'The luck that is ordained for you will be coveted by others.',
            '-•-•': 'Very unlucky indeed pray to God for His assistance.',
            '•-••': 'God will change your misfortune into success at present.',
            '-••-': 'You have no luck - pray to God and strive honestly.',
            '---•': 'There is great hindrance to your success at present.',
            '--•-': 'Heaven will bestow its blessings on you.',
            '-•••': 'Your expectations are vain, you will not succeed.',
            '--••': 'Your fortune will shortly change to misfortune.',
            '••--': 'You will succeed in your undertaking.',
            '•••-': 'You will meet sorrow and trouble.',
            '-•--': 'You will more luck than you expect.',
            '•---': 'You will have great success.',
            '•--•': 'Your misfortunes will vanish and you will be happy.',
            '••-•': 'Depend not too much on your good luck.',
            '•-•-': 'You will yet live in splendor and plenty.',
            '----': 'You are not lucky - pray to God that He may help you.'
        },
        'Gain or Lose': {
            '••••': 'With the blessing of God, you will have great gain.',
            '-•-•': 'By venturing freely, you will certainly gain double.',
            '•-••': 'You will hereafter gain what you seek.',
            '-••-': 'A great fortune is ordained for you - wait patiently.',
            '---•': 'You will meet no gain in your pursuits.',
            '--•-': 'Decline the pusuit find you will do well.',
            '-•••': 'Place your trust in God, who disposes happiness.',
            '--••': 'You will not have any success for the present.',
            '••--': 'Your gain will be trivial.',
            '•••-': 'Expect no gain, it will be in vain.',
            '-•--': 'You will soon gain what you little expect.',
            '•---': 'You will be cheated out of your gain.',
            '•--•': 'Be joyful for future prosperity is ordained for you.',
            '••-•': 'If you deal fair, you will surely prosper.',
            '•-•-': 'God will support you in good cause.',
            '----': 'You will gave no gain, therefor be wise and carful.'
        },
        'Foreign Land': {
            '••••': 'You will obtain a great fortune in another country.',
            '-•-•': 'Remain among your friends and you will do well.',
            '•-••': 'You will gain and be successful in foreingn land.',
            '-••-': 'Remain at home among your friends and you eill escape misfortunes.',
            '---•': 'Ylour fortune will be found in abundance abroad.',
            '--•-': 'You will not be prosperous or fortunate in foreign land.',
            '-•••': 'You eill meet luck and happiness in foreign land.',
            '--••': 'If you remain at home, you will have success.',
            '••--': 'You will succeed as you desire in foreign land.',
            '•••-': 'When abroad keep from evil women else they will do you harm.',
            '-•--': 'A foreign woman greatly enhance your fortune.',
            '•---': 'Depend upon your own industry and remain at home.',
            '•--•': 'You will dwell abroad in comfort and happiness.',
            '••-•': 'You will not move from where you are at present.',
            '•-•-': 'You stay is not here, therfore, be prepared for a change.',
            '----': 'It will be your fate to stay wher you are now.'
        },
        'Stranger or Favor': {
            '••••': 'The stranger will not return as soon as you expect.',
            '-•-•': 'It is out of the strange\'s power to rerurn.',
            '•-••': 'The stranger will return unexpectedly.',
            '-••-': 'A certain affair prevents the stranger\'s immediate return.',
            '---•': 'The traveller will soon return with joy.',
            '--•-': 'The traveller will be absent for a considerabe time.',
            '-•••': 'The stranger will soon return with plenty.',
            '--••': 'The traveller return is ordered doubtful by his conduct.',
            '••--': 'The stranger will return but not quickly.',
            '•••-': 'The stranger will not retrun.',
            '-•--': 'He is dangerously ill and cannot return yet.',
            '•---': 'The stranger will return very soon.',
            '•--•': 'The stranger with joy will soon return.',
            '••-•': 'Love prevents his return home at present.',
            '•-•-': 'Sickness prevents the traveller from seeing you.',
            '----': 'You must not expect to see the stranger again.'
        },
        'Property or Theft': {
            '••••': 'By persevering, you will recover your property.',
            '-•-•': 'You must bear your loss with fortitude.',
            '•-••': 'Your hopes to recover your property are in vain.',
            '-••-': 'You will recover the stolen property through cunning, person.',
            '---•': 'The Property is lost forever, the thief will be punished.',
            '--•-': 'You will lose, but the thief will suffer most.',
            '-•••': 'You will find your property at certain time.',
            '--••': 'You will never recover, from the theft.',
            '••--': 'You will soon recover what is stolen.',
            '•••-': 'You will never receive your goods.',
            '-•--': 'In a very singular manner, you will recover your property.',
            '•---': 'You will not recover th stolen property.',
            '•--•': 'You will recover your property unexpectedly.',
            '••-•': 'You must not expect to regain that which you have lost.',
            '•-•-': 'With some trouble and expenses, you may recover your property.',
            '----': 'You will not recover the property you have lost.'
        },
        'Friend or Dealings': {
            '••••': 'This friend exceeds all others in every respect.',
            '-•-•': 'Your prtended friend hate you secretly.',
            '•-••': 'Your friend will be as sincere as you could wish him to be.',
            '-••-': 'Do not rely on the friendship this person.',
            '---•': 'This person\'s love is just and true, you may rely on it.',
            '--•-': 'Place no great trust in that person.',
            '-•••': 'This person is a sincere friend.',
            '--••': 'Not a friend but a secrete enemy.',
            '••--': 'This fiend is more valuable than gold.',
            '•••-': 'Trust him not, lie is constant and deceitful.',
            '-•--': 'There is a true and sincere friendship between you both.',
            '•---': 'Beware of friend who are false and deceitful.',
            '•--•': 'You may depend on a true and sincere friendship.',
            '••-•': 'He means not what he says, for his heart is false.',
            '•-•-': 'This is serious and true and deserves to be respected.',
            '----': 'If you trust this friend you may have cause for sorrow.'
        },
        'Short Travel': {
            '••••': 'Commence your travel and they will go on as you would wish.',
            '-•-•': 'It will be in vain for you to travel.',
            '•-••': 'You will be prosperous in your journey.',
            '-••-': 'You will be unlucky in your travels.',
            '---•': 'Your journey will prove to your advantage.',
            '--•-': 'Venture not from home.',
            '-•••': 'You may proceed with confidence.',
            '--••': 'You will not prosper from home.',
            '••--': 'You may proceed on your journey without fear.',
            '•••-': 'Decline your travels, for they will not be to your advantage.',
            '-•--': 'God will surely travel with you and bless you.',
            '•---': 'Your travel is in vain you had better stay at home.',
            '•--•': 'Your travel would be prosperous, if guided by prudence.',
            '••-•': 'Decline your travels for the present for they will be dangerous.',
            '•-•-': 'Proceed on your travels or journey and you will not have cause to regret it.',
            '----': 'Prepare for a short journey; you will be recalled on unexpected event.'
        },
        'Love and Regard': {
            '••••': 'The love is great but will cause great jealousness.',
            '-•-•': 'A sincere love from an upright heart.',
            '•-••': 'This love is whimsical and changeable.',
            '-••-': 'She or he wishes to be yous the moment.',
            '---•': 'Await for some time and you will find the love great.',
            '--•-': 'No one loves you better in this world.',
            '-•••': 'The person loves you sincerely.',
            '--••': 'The person has great love for you but wishes to conceal it.',
            '••--': 'You had better decline this love, for it is neither constant nor true.',
            '•••-': 'This love comes from an upright and sincere heart.',
            '-•--': 'Decline a courtship which may be your destruction.',
            '•---': 'You love a person who does not speak well of you.',
            '•--•': 'This love is false to you and true to others.',
            '••-•': 'This love is true and costant - forsake it not.',
            '•-•-': 'Avoid this love.',
            '----': 'This love is from the heart and continues till death.'
        },
        'Marriage': {
            '••••': 'After much misfortune, you will lie comfortable and happy.',
            '-•-•': 'Various misforunes will attend this marriage.',
            '•-••': 'The marriage will be prosperous.',
            '-••-': 'By this marriage, you will gain nothing.',
            '---•': 'Delay not this marriage, you will meet much happiness.',
            '--•-': 'Hasten your marriage, it will bring you much happiness.',
            '-•••': 'By wedding this person, you ensure happiness for your self.',
            '--••': 'If you marry this person, you will have enemies where you little expect.',
            '••--': 'By this marriage you will have great luck and prosperity.',
            '•••-': 'Decline this marriage or else you may he sorry.',
            '-•--': 'A marriage which will add to your welfare and prosperity.',
            '•---': 'This marriage will bring you property be therefore, discreet.',
            '•--•': 'Your intentions would destroy your test and peace.',
            '••-•': 'Decline this marriage else, it may be to your sorrow.',
            '•-•-': 'If you wish to be happy, do not marry this person.',
            '----': 'The marriage will not answer your expectations.'
        },
        'Wife or Husband': {
            '••••': 'You will get a very handsome person for your partner.',
            '-•-•': 'You will get a partner with great underfakings and much money.',
            '•-••': 'You will marry into a very respectable family.',
            '-••-': 'You will get a virtuous partner.',
            '---•': 'A rich young person will be your partner.',
            '--•-': 'A rich partner but a bad temper.',
            '-•••': 'You will have a virtuous and religious, woman or man for wife or husband.',
            '--••': 'A rich partner is ordaine for you.',
            '••--': 'The person has not a great fortune is in middle circumstance.',
            '•••-': 'The person will be low in circumstances but honest hearted.',
            '-•--': 'Your partner will be found of liquor and will debase himself.',
            '•---': 'A worthy person fine future.',
            '•--•': 'You will get an honest young and handsome partner.',
            '••-•': 'You will be married to your equal in a short time.',
            '•-•-': 'You will marry a person with whom you will have little comfort.',
            '----': 'It will be difficult for you to get a partner.'
        },
        'Son or Daugther': {
            '••••': 'She will have a son who will gain wealth and honors.',
            '-•-•': 'She will have a daughter.',
            '•-••': 'She will have a son who will live to a great age.',
            '-••-': 'She will have two daughters.',
            '---•': 'She will have a son who will prove forward.',
            '--•-': 'A very handsome daughter but a painful one.',
            '-•••': 'She will have a son who will learn and wise.',
            '--••': 'She will have a daughter and will require attention.',
            '••--': 'She will have a dutiful and handsome son.',
            '•••-': 'She will have a daughter who will be honoured and respected.',
            '-•--': 'She will have avery fine boy.',
            '•---': 'A daughter but of a very sikly constitution.',
            '•--•': 'She will have ahealthy son.',
            '••-•': 'She will have a very fine daughter.',
            '•-•-': 'She will have a son.',
            '----': 'She will gave a daughter.'
        },
        'Illness': {
            '••••': 'The patient will recover but his days are short.',
            '-•-•': 'The patient\'s recovery is doubrful.',
            '•-••': 'The patient will recover and live long.',
            '-••-': 'Recovery is doubtful therefore be prepared for the worst.',
            '---•': 'Life will be spared this time to prepare for death.',
            '--•-': 'The patient should be prepared to leave this world.',
            '-•••': 'The patient will yet enjoy health prosperity.',
            '--••': 'The patient\'s illness will be lingering doubtful.',
            '••--': 'The patient will soon recover there is no danger.',
            '•••-': 'The patient\'s  recovery is doubtful.',
            '-•--': 'By the blessing of God, the patient will recover.',
            '•---': 'The patient will relieved from sickness.',
            '•--•': 'God will give the patient health and strength again.',
            '••-•': 'The patient will depart this world.',
            '•-•-': 'The patient will recover.',
            '----': 'The patient\'s recovery is unlikely.'
        },
        'Prisoner': {
            '••••': 'The prisoner will be release with joy.',
            '-•-•': 'The prisoner will be out with the power of his enemies.',
            '•-••': 'He will yet come to honour, although he now suffers.',
            '-••-': 'The prisoner dies and is regretted by his friends.',
            '---•': 'With great difficulty, he will obtain pardon or release.',
            '--•-': 'The prisoner would find it difficult to obtain his pardon or release.',
            '-•••': 'The prisoner will escape this time.',
            '--••': 'The prisoner\'s sorrow anxiety are great and his release uncertain.',
            '••--': 'Prisoner would be restored to liberty and uncertain freedom.',
            '•••-': 'The prisoner would be released by death only.',
            '-•--': 'After long imprisonment, he will be released.',
            '•---': 'After a short time, your anxiety for the prisoner will cease.',
            '•--•': 'The prisoner will be released.',
            '••-•': 'The prisoner will pass many days in confinement.',
            '•-•-': 'Someone will pity and release the prisoner.',
            '----': 'Death may end the imprisonment.'
        },
        'Lucky or Unlucky': {
            '••••': 'This day brings you an incrrease of happiness.',
            '-•-•': 'This day is not very lucky but rather the reverse.',
            '•-••': 'Be very cautious on what you do this day lest trouble befall you.',
            '-••-': 'There are enemies who would defraud and tender you unhappy.',
            '---•': 'Be well prepared this day or you may meet with trouble.',
            '--•-': 'Whatever may possess your inclinations this day, abandon them.',
            '-•••': 'Beware - an enemy is dndeavoring to bi ing you to strife and misfortune.',
            '--••': 'This day is unlucky - therefore alter your intentions.',
            '••--': 'Ill luck awaits you. it will be difficult for you to escape.',
            '•••-': 'Cheer up your spirits, your luck is at hand.',
            '-•--': 'Beware of your enemies who seek to do you harm lit.',
            '•---': 'Be reconciled, your circumstaces will shortly mend.',
            '•--•': 'Inspite of enemies, you will do well.',
            '••-•': 'You will have no occasion to complain of ill luck.',
            '•-•-': 'Your luck is in blossom, it will soon be at hand.',
            '----': 'There are misfortunes lurking around you.'
        },
        'Dreams': {
            '••••': 'Signifies much joy and happiness between friend.',
            '-•-•': 'Signifies trouble and sorrows.',
            '•-••': 'Signifies a favour or kindness from some persons.',
            '-••-': 'Signifies peace and plenty between friends.',
            '---•': 'Signifies that you have many impediments in the accomplishment of your pursuits.',
            '--•-': 'Signifies that you have enemies who will endeavor to ruin you and make you unhappy.',
            '-•••': 'Signifies there is sorrow and danger befor you.',
            '--••': 'Signifies that you will shortly be out of power of your enemies.',
            '••--': 'Signifies that on this day, your fortunes will change for the better.',
            '•••-': 'Signifies that the misfortune which threatens will be pi evented.',
            '-•--': 'Signifies that there are rogues at hand.',
            '•---': 'Signifies that you will get money.',
            '•--•': 'Signifies. that you will be asked to n wedding',
            '••-•': 'Signifies that sorrow will depart and joy will return.',
            '•-•-': 'Signifies you will soon hear agreeable news.',
            '----': 'Signifies that you should be very careful this day lest accident may bafall you.'
        }  
    };  

    // Make interpretations available for debugging
    window.myDebugInterpretations = interpretations;

    // First, display saved patterns in houses 9-12 (matching our 4 boxes)
    const sourceHouses = {};
    const houses = [
        'houseOne', 'houseTwo', 'houseThree', 'houseFour',
        'houseFive', 'houseSix', 'houseSeven', 'houseEight',
        'houseNine', 'houseTen', 'houseEleven', 'houseTwelve',
        'houseThirten', 'houseFourten', 'houseFiften', 'houseSixten'
    ];

    for (let i = 1; i <= 4; i++) {
        const savedData = localStorage.getItem(`box${i}Results`);
        if (savedData) {
            const results = JSON.parse(savedData);
            const houseId = houses[i + 7]; // houseNine (8), houseTen (9), etc.
            const houseElement = document.getElementById(houseId);
            
            if (houseElement) {
                // Clear only symbols, keep the house number
                houseElement.querySelectorAll('.dot, .dash').forEach(el => el.remove());
                
                const symbolContainer = document.createElement('div');
                symbolContainer.style.display = 'flex';
                symbolContainer.style.flexDirection = 'column';
                symbolContainer.style.alignItems = 'center';
                symbolContainer.style.justifyContent = 'center';
                symbolContainer.style.gap = '2px';
                
                results.forEach(result => {
                    const symbol = document.createElement('div');
                    symbol.className = result === 'dot' ? 'dot' : 'dash';
                    symbolContainer.appendChild(symbol);
                });
                
                houseElement.appendChild(symbolContainer);
                sourceHouses[houseId] = symbolContainer;
            }
        }
    }

    // Function to pair two houses column-wise and fill target house
    function pairHousesColumnWise(house1Id, house2Id, targetHouseId) {
        const house1 = document.getElementById(house1Id);
        const house2 = document.getElementById(house2Id);
        const targetHouse = document.getElementById(targetHouseId);
        
        if (!house1 || !house2 || !targetHouse) return null;
        
        const house1Symbols = house1.querySelectorAll('.dot, .dash');
        const house2Symbols = house2.querySelectorAll('.dot, .dash');
        
        // Ensure both houses have at least 4 lines
        if (house1Symbols.length < 4 || house2Symbols.length < 4) {
            console.error('Houses need at least 4 lines for pairing');
            return null;
        }
        
        // Clear only symbols, keep the house number
        targetHouse.querySelectorAll('.dot, .dash').forEach(el => el.remove());
        
        const symbolContainer = document.createElement('div');
        symbolContainer.style.display = 'flex';
        symbolContainer.style.flexDirection = 'column';
        symbolContainer.style.alignItems = 'center';
        symbolContainer.style.justifyContent = 'center';
        symbolContainer.style.gap = '2px';
        
        // Process each of the 4 lines
        for (let line = 0; line < 4; line++) {
            const isHouse1Dash = house1Symbols[line].className === 'dash';
            const isHouse2Dash = house2Symbols[line].className === 'dash';
            
            // XOR logic: same = dash, different = dot
            const resultSymbol = (isHouse1Dash === isHouse2Dash) ? 'dash' : 'dot';
            
            const symbol = document.createElement('div');
            symbol.className = resultSymbol;
            symbolContainer.appendChild(symbol);
        }
        
        targetHouse.appendChild(symbolContainer);
        sourceHouses[targetHouseId] = symbolContainer;
        return symbolContainer;
    }

    // Function to copy specific row lines from multiple houses to a target house
    function copyRowLinesToHouse(rowIndex, sourceHouseIds, targetHouseId) {
        const targetHouse = document.getElementById(targetHouseId);
        if (!targetHouse) return null;
        
        // Clear only symbols, keep the house number
        targetHouse.querySelectorAll('.dot, .dash').forEach(el => el.remove());
        
        const symbolContainer = document.createElement('div');
        symbolContainer.style.display = 'flex';
        symbolContainer.style.flexDirection = 'column';
        symbolContainer.style.alignItems = 'center';
        symbolContainer.style.justifyContent = 'center';
        symbolContainer.style.gap = '2px';
        
        sourceHouseIds.forEach(houseId => {
            const house = document.getElementById(houseId);
            if (house) {
                const symbols = house.querySelectorAll('.dot, .dash');
                if (symbols.length > rowIndex) {
                    const symbol = symbols[rowIndex].cloneNode(true);
                    symbolContainer.appendChild(symbol);
                }
            }
        });
        
        targetHouse.appendChild(symbolContainer);
        sourceHouses[targetHouseId] = symbolContainer;
        return symbolContainer;
    }

    // Copy specific row lines to houses 13-16
    if (document.getElementById('houseNine') && document.getElementById('houseTen') && 
        document.getElementById('houseEleven') && document.getElementById('houseTwelve')) {
        // 1st row line to houseThirten
        copyRowLinesToHouse(0, ['houseNine', 'houseTen', 'houseEleven', 'houseTwelve'], 'houseThirten');
        
        // 2nd row line to houseFourten
        copyRowLinesToHouse(1, ['houseNine', 'houseTen', 'houseEleven', 'houseTwelve'], 'houseFourten');
        
        // 3rd row line to houseFiften
        copyRowLinesToHouse(2, ['houseNine', 'houseTen', 'houseEleven', 'houseTwelve'], 'houseFiften');
        
        // 4th row line to houseSixten
        copyRowLinesToHouse(3, ['houseNine', 'houseTen', 'houseEleven', 'houseTwelve'], 'houseSixten');
    }

    // Pair houseThirten and houseFourten → houseSeven
    pairHousesColumnWise('houseThirten', 'houseFourten', 'houseSeven');
    
    // Pair houseFiften and houseSixten → houseEight
    pairHousesColumnWise('houseFiften', 'houseSixten', 'houseEight');
    
    // Pair houseSeven and houseEight → houseFour
    pairHousesColumnWise('houseSeven', 'houseEight', 'houseFour');

    // Pair houseNine and houseTen → houseFive
    pairHousesColumnWise('houseNine', 'houseTen', 'houseFive');
    
    // Pair houseEleven and houseTwelve → houseSix
    pairHousesColumnWise('houseEleven', 'houseTwelve', 'houseSix');
    
    // Pair houseFive and houseSix → houseThree (with XOR logic)
    if (document.getElementById('houseFive') && document.getElementById('houseSix') && document.getElementById('houseThree')) {
        const house5 = document.getElementById('houseFive');
        const house6 = document.getElementById('houseSix');
        const house3 = document.getElementById('houseThree');
        
        const house5Symbols = house5.querySelectorAll('.dot, .dash');
        const house6Symbols = house6.querySelectorAll('.dot, .dash');
        
        // Clear only symbols, keep the house number
        house3.querySelectorAll('.dot, .dash').forEach(el => el.remove());
        
        const symbolContainer = document.createElement('div');
        symbolContainer.style.display = 'flex';
        symbolContainer.style.flexDirection = 'column';
        symbolContainer.style.alignItems = 'center';
        symbolContainer.style.justifyContent = 'center';
        symbolContainer.style.gap = '2px';
        
        // Process each of the 4 lines with XOR logic
        for (let line = 0; line < 4; line++) {
            const isHouse5Dash = house5Symbols[line] && house5Symbols[line].className === 'dash';
            const isHouse6Dash = house6Symbols[line] && house6Symbols[line].className === 'dash';
            
            // XOR logic: same = dash, different = dot
            const resultSymbol = (isHouse5Dash === isHouse6Dash) ? 'dash' : 'dot';
            
            const symbol = document.createElement('div');
            symbol.className = resultSymbol;
            symbolContainer.appendChild(symbol);
        }
        
        house3.appendChild(symbolContainer);
        sourceHouses['houseThree'] = symbolContainer;
    }

    // Pair houseThree and houseFour → houseTwo (with XOR logic)
    if (document.getElementById('houseThree') && document.getElementById('houseFour') && document.getElementById('houseTwo')) {
        const house3 = document.getElementById('houseThree');
        const house4 = document.getElementById('houseFour');
        const house2 = document.getElementById('houseTwo');
        
        const house3Symbols = house3.querySelectorAll('.dot, .dash');
        const house4Symbols = house4.querySelectorAll('.dot, .dash');
        
        // Clear only symbols, keep the house number
        house2.querySelectorAll('.dot, .dash').forEach(el => el.remove());
        
        const symbolContainer = document.createElement('div');
        symbolContainer.style.display = 'flex';
        symbolContainer.style.flexDirection = 'column';
        symbolContainer.style.alignItems = 'center';
        symbolContainer.style.justifyContent = 'center';
        symbolContainer.style.gap = '2px';
        
        // Process each of the 4 lines with XOR logic
        for (let line = 0; line < 4; line++) {
            const isHouse3Dash = house3Symbols[line] && house3Symbols[line].className === 'dash';
            const isHouse4Dash = house4Symbols[line] && house4Symbols[line].className === 'dash';
            
            // XOR logic: same = dash, different = dot
            const resultSymbol = (isHouse3Dash === isHouse4Dash) ? 'dash' : 'dot';
            
            const symbol = document.createElement('div');
            symbol.className = resultSymbol;
            symbolContainer.appendChild(symbol);
        }
        
        house2.appendChild(symbolContainer);
        sourceHouses['houseTwo'] = symbolContainer;
    }
    
    // Pair houseTwo and houseNine → houseOne
    pairHousesColumnWise('houseTwo', 'houseNine', 'houseOne');

    // Button click handlers
    document.querySelectorAll('.details button').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            const houseId = buttonHouses[buttonText];
            const houseElement = document.getElementById(houseId);
            
            if (houseElement) {
                const symbols = houseElement.querySelectorAll('.dot, .dash');
                let pattern = '';
                
                symbols.forEach(symbol => {
                    pattern += symbol.classList.contains('dot') ? '•' : '-';
                });
                
                // Get the interpretation for this house and pattern
                const interpretation = interpretations[buttonText]?.[pattern] || 
                    "This reading shows a special combination of energies.";
                
                alert(interpretation);
            } else {
                alert("No reading available for this selection yet.");
            }
        });
    });

    // Back button functionality
    document.getElementById('backBtn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Share button functionality
    document.getElementById('shareBtn').addEventListener('click', function() {
        alert('Share functionality would go here');
    });

    // Infinite scroll implementation for manual scrolling
    const detailsContainer = document.querySelector('.detailsContainer');
    const detailsContent = document.querySelector('.details');
    const buttons = document.querySelectorAll('.details button');
    const buttonHeight = buttons[0]?.offsetHeight || 50;
    const gap = 5;

    if (detailsContainer && detailsContent && buttons.length > 0) {
        // Clone buttons for infinite scroll
        const cloneButtons = () => {
            buttons.forEach(button => {
                const clone = button.cloneNode(true);
                detailsContent.appendChild(clone);
                
                clone.addEventListener('click', function() {
                    const buttonText = this.textContent;
                    const houseId = buttonHouses[buttonText];
                    const houseElement = document.getElementById(houseId);
                    
                    if (houseElement) {
                        const symbols = houseElement.querySelectorAll('.dot, .dash');
                        let pattern = '';
                        
                        symbols.forEach(symbol => {
                            pattern += symbol.classList.contains('dot') ? '•' : '-';
                        });
                        
                        const interpretation = interpretations[buttonText]?.[pattern] || 
                            "This reading shows a special combination of energies.";
                        
                        alert(interpretation);
                    }
                });
            });
        };

        // Clone buttons several times
        for (let i = 0; i < 3; i++) {
            cloneButtons();
        }

        // Handle scroll events
        detailsContainer.addEventListener('scroll', function() {
            const scrollTop = detailsContainer.scrollTop;
            const scrollHeight = detailsContent.scrollHeight;
            const clientHeight = detailsContainer.clientHeight;
            
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                const itemsToMove = Math.min(5, detailsContent.children.length);
                for (let i = 0; i < itemsToMove; i++) {
                    const firstChild = detailsContent.children[0];
                    detailsContent.appendChild(firstChild);
                }
                detailsContainer.scrollTop -= (buttonHeight + gap) * itemsToMove;
            }
            else if (scrollTop <= 100) {
                const itemsToMove = Math.min(5, detailsContent.children.length);
                for (let i = 0; i < itemsToMove; i++) {
                    const lastChild = detailsContent.children[detailsContent.children.length - 1];
                    detailsContent.insertBefore(lastChild, detailsContent.firstChild);
                }
                detailsContainer.scrollTop += (buttonHeight + gap) * itemsToMove;
            }
        });

        // Set initial scroll position
        setTimeout(() => {
            detailsContainer.scrollTop = (detailsContent.scrollHeight - detailsContainer.clientHeight) / 2;
        }, 100);
    }
});
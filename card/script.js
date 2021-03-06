import { writeProductData, readProductData, googleLogin } from "../login.js";

const ability = ["others", "hot", "cool", "insurance"]
window.googleLogin = function () {
    googleLogin();
}

window.openLoginMenu = function () {
    document.getElementById('login-container').style.right = '0';
}

window.closeLoginMenu = function () {
    document.getElementById('login-container').style.right = '-300px';
}

window.closeAddWindows = function () {
    document.getElementById('add-window-1').setAttribute('emphasized','false');
    document.getElementById('add-window-2').setAttribute('emphasized','false');
    document.getElementById('add-window-3').setAttribute('emphasized','false');
}

window.openAddWindow = function (index) {
    window.closeAddWindows();
    if (index === 3) {
        const jobFlatList = Object.keys(teamList).flatMap(i => teamList[i]);
        for (const job of jobFlatList) {
            const amountInputs = [...document.getElementById(`amount-${job}`).getElementsByClassName('amount')];
            const amountList = amountInputs.map(i => parseInt(i.value));
            const priceInputs = [...document.getElementById(`price-${job}`).getElementsByClassName('price')];
            for (let j = 0; j < amountList.length; j++) {
                if (amountList[j] === 0) {
                    priceInputs[j].value = 0;
                    priceInputs[j].disabled = true;
                    priceInputs[j].style.color = 'rgb(128,128,128)';
                }
                else {
                    priceInputs[j].value = priceList[job][ability[j]];
                    priceInputs[j].disabled = false;
                    priceInputs[j].style.color = document.body.style.getPropertyValue("--text");
                }
            }
        }
    }
    const bodyWidth = document.body.offsetWidth;
    const addWindow = document.getElementById(`add-window-${index}`);
    addWindow.setAttribute('emphasized','true');
    addWindow.style.left = `${bodyWidth/2 - addWindow.offsetWidth/2}px`;
};

window.closeProductWindow = function (num, index) {
    const productWindow = document.getElementById(`product-window-${num}-${index}`);
    productWindow.setAttribute('emphasized','false');
}

window.openProductWindow = function (num, index) {
    closeProductWindow(num, 1);
    closeProductWindow(num, 2);
    closeProductWindow(num, 3);
    const bodyWidth = document.body.offsetWidth;
    const productWindow = document.getElementById(`product-window-${num}-${index}`);
    productWindow.setAttribute('emphasized','true');
    productWindow.style.left = `${bodyWidth/2 - productWindow.offsetWidth/2}px`;
}

window.submit = function() {
    const author = document.getElementById('author').value;
    const comment = document.getElementById('comment').value;
    const date = `${new Date().getMonth()+1}??? ${new Date().getDate()}???`;
    const amountData = [];
    const priceData = [];
    for (let job in priceList) {
        const amountInputs = [...document.getElementById(`amount-${job}`).getElementsByClassName('amount')];
        const amountValues = amountInputs.map(i => parseInt(i.value));
        amountData.push({
            job,
            others: amountValues[0],
            hot: amountValues[1],
            cool: amountValues[2],
            insurance: amountValues[3]
        });
        const priceInputs = [...document.getElementById(`price-${job}`).getElementsByClassName('price')];
        const priceValues = priceInputs.map(i => parseInt(i.value));
        priceData.push({
            job,
            others: priceValues[0],
            hot: priceValues[1],
            cool: priceValues[2],
            insurance: priceValues[3]
        });
    }
    //TODO if (author == '') {}
    writeProductData(author, comment, date, amountData, priceData);
    closeAddWindows();
}

window.onload = async function () {
    /*
    const userColorTheme = localStorage.getItem('color-theme');
    const osColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const colorTheme = userColorTheme ? userColorTheme : osColorTheme;
    if (colorTheme === 'dark') {
        localStorage.setItem('color-theme', 'dark');
        document.documentElement.setAttribute('color-theme', 'dark');
        document.getElementById('dark-checkbox').setAttribute('checked', true);
        document.getElementById('header-img').setAttribute('src','../images/logo-dark.png');
        document.getElementById('plus-img').innerHTML = '<defs><style>.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:150px;}</style></defs><g id="?????????_9" data-name="????????? 9"><line class="cls-1" x1="500" y1="221" x2="500" y2="779"/><line class="cls-1" x1="221" y1="500" x2="779" y2="500"/></g>';
    } else {
        localStorage.setItem('color-theme', 'light');
        document.documentElement.setAttribute('color-theme', 'light');
        document.getElementById('header-img').setAttribute('src','../images/logo-light.png');
        document.getElementById('plus-img').innerHTML = '<defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:150px;}</style></defs><g id="?????????_9" data-name="????????? 9"><line class="cls-1" x1="500" y1="221" x2="500" y2="779"/><line class="cls-1" x1="221" y1="500" x2="779" y2="500"/></g>';
    }
    */
    document.documentElement.setAttribute('color-theme', 'dark');

    const jobPrice = document.getElementById('job-price');
    for (let job in priceList) {
        const team = Object.keys(teamList).find(i => teamList[i].some(e => e === job));
        const price = priceList[job];
        const tr = document.createElement('tr');
        tr.setAttribute('id', `price-${job}`);
        tr.innerHTML = `<td class='${team}'>
            ${job}
        </td>
        <td>
            <input class='price' type='number' min='0' max='99' value='${price.others}'>
        </td>
        <td>
            <input class='price' type='number' min='0' max='99' value='${price.hot}'>
        </td>
        <td>
            <input class='price' type='number' min='0' max='99' value='${price.cool}'>
        </td>
        <td>
            <input class='price' type='number' min='0' max='99' value='${price.insurance}'>
        </td>`;
        jobPrice.getElementsByTagName('tbody')[0].appendChild(tr);
    }

    const jobAmount = document.getElementById('job-amount');
    for (let job in priceList) {
        const team = Object.keys(teamList).find(i => teamList[i].some(e => e === job));
        const tr = document.createElement('tr');
        tr.setAttribute('id', `amount-${job}`);
        tr.innerHTML = `<td class='${team}'>
            ${job}
        </td>
        <td>
            <input class='amount' type='number' value='0' min='0' max='99'>
        </td>
        <td>
            <input class='amount' type='number' value='0' min='0' max='99'>
        </td>
        <td>
            <input class='amount' type='number' value='0' min='0' max='99'>
        </td>
        <td>
            <input class='amount' type='number' value='0' min='0' max='99'>
        </td>`;
        jobAmount.getElementsByTagName('tbody')[0].appendChild(tr);
    }

    const productData = await readProductData();
    if (productData !== null) {
        const productTable = document.getElementById('product-list');
        for (let i = 0; i < productData.length; i++) {
            const amountList = productData[i].amount;
            const priceList = productData[i].price;
            let totalAmount = 0;
            const div1 = document.createElement('div');
            div1.innerHTML = `
                <div class='window-title-container'>
                    <span class='window-title'>
                        ?????? ??????
                    </span>
                    <p class='closeButton' onclick='closeProductWindow(${i},1)'>&times;</p>
                </div>
                <div id='author-container'>
                    <p class='input-title'>
                        ?????????
                    </p>
                    <p id='author-output'>
                        ${productData[i].name}
                    </p>
                </div>
                <div id='comment-container'>
                    <p class='input-title'>
                        ??????????????? ??? ???
                    </p>
                    <p id='comment-output'>
                        ${productData[i].comment}
                    </p>
                </div>
                <div id='move'>
                    <button class='next' onclick='openProductWindow(${i},2)'>
                        ??????
                        &blacktriangleright;
                    </button>
                </div>
            `;
            const div2 = document.createElement('div');
            div2.innerHTML = `
                <div class='window-title-container'>
                    <span class='window-title'>
                        ??????
                    </span>
                    <p class='closeButton' onclick='closeProductWindow(${i},2)'>&times;</p>
                </div>
                <table id='job-amount'>
                    <tr>
                        <th class='job'>
                            ??????
                        </th>
                        <th class='others'>
                            ??????
                        </th>
                        <th class='hot'>
                            ??????
                        </th>
                        <th class='cool'>
                            ??????
                        </th>
                        <th class='insurance'>
                            ??????/??????
                        </th>
                    </tr>
                </table>
                <div id='move'>
                    <button class='prev' onclick='openProductWindow(${i},1)'>
                        &blacktriangleleft;
                        ??????
                    </button>
                    <button class='next' onclick='openProductWindow(${i},3)'>
                        ??????
                        &blacktriangleright;
                    </button>
                </div>
            `;
            const div3 = document.createElement('div');
            div3.innerHTML = `
                <div class='window-title-container'>
                    <span class='window-title'>
                        ?????? ??????
                    </span>
                    <p class='closeButton' onclick='closeProductWindow(${i},3)'>&times;</p>
                </div>
                <table id='job-price'>
                    <tr>
                        <th class='job'>
                            ??????
                        </th>
                        <th class='others'>
                            ??????
                        </th>
                        <th class='hot'>
                            ??????
                        </th>
                        <th class='cool'>
                            ??????
                        </th>
                        <th class='insurance'>
                            ??????/??????
                        </th>
                    </tr>
                </table>
                <div id='move'>
                    <button class='prev' onclick='openProductWindow(${i},2)'>
                        &blacktriangleleft;
                        ??????
                    </button>
                    <button class='next' onclick='closeProductWindow(${i},3)'>
                        ?????? ??????
                    </button>
                </div>
            `;

            for (let j of amountList) {
                totalAmount += ( j.others + j.hot + j.cool + j.insurance );
                const tr = document.createElement('tr');
                const team = Object.keys(teamList).find(e => teamList[e].includes(j.job));
                tr.innerHTML = `
                    <td class='${team}'>
                        ${j.job}
                    </td>
                    <td>
                        ${j.others}
                    </td>
                    <td>
                        ${j.hot}
                    </td>
                    <td>
                        ${j.cool}
                    </td>
                    <td>
                        ${j.insurance}
                    </td>
                `;
                div2.querySelector('#job-amount > tbody').appendChild(tr);
            }

            for (let k of priceList) {
                const tr = document.createElement('tr');
                const team = Object.keys(teamList).find(e => teamList[e].includes(k.job));
                tr.innerHTML = `
                    <td class='${team}'>
                        ${k.job}
                    </td>
                    <td>
                        ${k.others}
                    </td>
                    <td>
                        ${k.hot}
                    </td>
                    <td>
                        ${k.cool}
                    </td>
                    <td>
                        ${k.insurance}
                    </td>
                `;
                div3.querySelector('#job-price > tbody').appendChild(tr);
            }
            
            div1.setAttribute('class', 'product-window');
            div2.setAttribute('class', 'product-window');
            div3.setAttribute('class', 'product-window');
            div1.setAttribute('id', `product-window-${i}-1`);
            div2.setAttribute('id', `product-window-${i}-2`);
            div3.setAttribute('id', `product-window-${i}-3`);

            document.body.appendChild(div1);
            document.body.appendChild(div2);
            document.body.appendChild(div3);

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    ${totalAmount}
                </td>
                <td>
                    ${productData[i].name}
                </td>
                <td>
                    ${productData[i].date}
                </td>
            `;
            tr.onclick = () => openProductWindow(i,1);
            productTable.getElementsByTagName('tbody')[0].appendChild(tr);
        }
    }    
}
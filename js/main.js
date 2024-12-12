// getting all used HTML elements
const pageSign = document.querySelector('.page .page-sign-box');
const sign = document.querySelector('.page .page-sign-box .sign');
const signUpForm = document.querySelector('.page .sign-up form');
const alertsUp = document.querySelectorAll('.page .sign-up .alertUp');
const checkUser = document.querySelectorAll('.page .sign .check-user');
const signWelcome = document.querySelector('.page .page-sign-box .welcome');
const signInForm = document.querySelector('.page .sign-in form');
const signInInputs = document.querySelectorAll('.page .sign-in input');
const swiperNext = document.querySelector('.page .sign .swiper-button-next');
const home = document.querySelector('.page .home');
const swiperWrapper = document.querySelector('.page .swiper .swiper-wrapper');
const productsRow = document.querySelector('.page .products .row');
const specialHeading = document.querySelectorAll('.special-heading');
const userName = document.querySelector('.page .home h1 + h2');
const logout = document.querySelector('.page .home .logout');
const cartRow = document.querySelector(' .cart .row');
const up = document.querySelector('span.up');
//---------------------------------------------------------------------------------------------------------------------------

const repoName = 'Web-Masters-Internship-week3-Task1';

console.log(window.location.origin + `/${repoName}/src/sign.html`);
if (window.location.pathname !== `/${repoName}/src/sign.html` && localStorage.getItem('token') == null)
    window.location = window.location.origin + `/${repoName}/src/sign.html`;
else if (home)
    userName.innerHTML = `Hello, ${JSON.parse(localStorage.getItem('token')).user} &#128075;`;



let users;

// start sign-up
if (signUpForm) {
    //reset users from localstorage after loading
    if (localStorage.getItem('users') == null) {
        users = [];
    }
    else {
        users = JSON.parse(localStorage.getItem('users'));
    }
    //----------------------------------------------------------------------------------------------------------------------------

    // sign-up form validation
    signUpForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const values = {
            username: {
                value: '',
                error: 'username must be maximum three names start with capital letter.'
            },
            emailUp: {
                value: '',
                error: 'email must be in the form example@example.com and can have ( _ , - , ! ) to be special characters.'
            },
            passwordUp: {
                value: '',
                error: 'password must start with capital letter.'
            },
            repasswordUp: {
                value: '',
                error: "repassword doesn't match the password field."
            }
        };

        let submit = true;

        const valuesKeys = Object.keys(values);
        //filling the object values after submitting
        for (let i = 0; i < valuesKeys.length; i++) {
            if (i < 3) {
                if (signUpValidation(signUpForm[valuesKeys[i]])) {
                    values[valuesKeys[i]].value = signUpForm[valuesKeys[i]].value;
                    alertsUp[i].style.cssText = `display : none !important`;
                    pageSign.style.setProperty('align-items', 'center');
                }
                else if (!signUpForm[valuesKeys[i]].value) {
                    alertsUp[i].style.cssText = `display : block !important`;
                    alertsUp[i].innerHTML = `${i ? valuesKeys[i].slice(0, valuesKeys[i].indexOf('U')) : valuesKeys[i]} is required.`;
                    pageSign.style.setProperty('align-items', 'flex-start');
                    submit = false;
                }
                else {
                    alertsUp[i].style.cssText = `display : block !important`;
                    alertsUp[i].innerHTML = values[valuesKeys[i]].error;
                    pageSign.style.setProperty('align-items', 'flex-start');
                    submit = false;
                }
            }
            else {
                if (!signUpForm[valuesKeys[i]].value) {
                    alertsUp[i].style.cssText = `display : block !important`;
                    alertsUp[i].innerHTML = `${valuesKeys[i].slice(0, valuesKeys[i].indexOf('U'))} is required.`;
                    pageSign.style.setProperty('align-items', 'flex-start');
                    submit = false;
                }
                else if (signUpForm[valuesKeys[i]].value == signUpForm[valuesKeys[i - 1]].value) {
                    values[valuesKeys[i]].value = signUpForm[valuesKeys[i]].value;
                    alertsUp[i].style.cssText = `display : none !important`;
                    pageSign.style.setProperty('align-items', 'center');
                }
                else {
                    alertsUp[i].style.cssText = `display : block !important`;
                    alertsUp[i].innerHTML = values[valuesKeys[i]].error;
                    pageSign.style.setProperty('align-items', 'flex-start');
                    submit = false;
                }
            }
        }

        if (submit) {
            let valid = true;
            for (let i = 0; i < users.length; i++) {
                if (values.emailUp.value == users[i].emailUp.value) {
                    valid = false;
                    checkUser[1].classList.add('show');
                    break;
                }
            }
            if (valid) {
                users.push(structuredClone({ ...values, cart: [] }));
                localStorage.setItem('users', JSON.stringify(users));
                swiperNext.click();
                for (let i = 0; i < valuesKeys.length; i++) {
                    signUpForm[valuesKeys[i]].value = '';
                }
            }
        }
    });

    // regex validation conditions
    function signUpValidation(input) {
        const regex = {
            username: /^([A-Z][a-z]+\s?){1,3}$/,
            emailUp: /^[a-zA-Z](\w|-|!)+@[a-z]+\.com$/,
            passwordUp: /^[A-Z]\w+$/,
        }

        return regex[input.id].test(input.value);
    }
    //----------------------------------------------------------------------------------------------------------------------------
}
//----------------------------------------------------------------------------------------------------------------------------

//start sign-in
if (signInForm) {
    // sign-in form submit
    let signInValues = {
        emailIn: '',
        passwordIn: ''
    }

    signInInputs.forEach((elem, i) => {
        elem.addEventListener('input', function () {
            signInValues[elem.id] = elem.value;
        })
    });

    signInForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let found = {
            index: '',
            status: false
        };
        for (let i = 0; i < users.length; i++) {
            if (signInValues.emailIn == users[i].emailUp.value && signInValues.passwordIn == users[i].passwordUp.value) {
                found = {
                    index: i,
                    status: true
                };
                break;
            }
        }

        if (found.status) {
            localStorage.setItem('token', JSON.stringify({
                id: found.index,
                user: users[found.index].username.value
            }));
            sign.classList.add('hide');
            setTimeout(() => {
                signWelcome.classList.add('show');
            }, 1000);
            setTimeout(() => {
                window.location.href = window.location.href.slice(0, window.location.href.indexOf('src')) + 'index.html';
            }, 2000);

        }
        else {
            checkUser[0].classList.add('show');
        }

    });
    //-----------------------------------------------------------------------------------------------------------------------------

    //checkUser clear the class show after animation end

    checkUser.forEach((elem) => {
        elem.addEventListener('animationend', function () {
            this.classList.remove('show');
        });
    });
    //-----------------------------------------------------------------------------------------------------------------------------
}
//----------------------------------------------------------------------------------------------------------------------------

// start home
if (home) {
    // handle logout
    logout.addEventListener('click', function () {
        localStorage.removeItem('token');
        document.body.children[0].innerHTML += `<div class="loading-screen fixed bg-[#61686bd9] size-full top-0 start-0 z-[99999] xy-center">
            <span class="loader size-12 border-4  rounded-full inline-block relative mx-auto"></span>
        </div>`;
        document.body.style.setProperty('overflow', 'hidden');

        setTimeout(() => {
            document.body.style.setProperty('overflow', 'visible');
            window.location = window.location.origin + `/${repoName}/src/sign.html`;
        }, 300);
    })
    //------------------------------------------------------------------------------------------------------------------------
    // handle categories
    let statusCategories;
    async function getAllCategories() {
        try {
            let response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
            statusCategories = response.status;
            response = await response.json();
            return response;
        } catch (error) {
            console.log(error?.message);
        }
    }
    async function displayCategories() {
        let data = (await getAllCategories()).data;

        swiperWrapper.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            swiperWrapper.innerHTML += `<div class="swiper-slide px-6">
                            <div class="inner h-full border-2 shadow-lg shadow-[#777]  rounded-md overflow-hidden p-2 duration-300">
                                <div class="mb-4" data-swiper-parallax="-100">
                                    <img src=${data[i]?.image} class="w-full  object-cover rounded-md shadow-md" alt="">
                                </div>
                                <h3 class="text-center text-nowrap text-ellipsis  overflow-hidden text-h3 transition-all duration-1000"  data-swiper-parallax-opacity="0">
                                    ${data[i]?.name}
                                </h3>
                            </div>
                        </div>`;
        }

    }
    displayCategories();
    //------------------------------------------------------------------------------------------------------------------------

    // handle products
    let userId = JSON.parse(localStorage.getItem('token')).id;
    let cart = JSON.parse(localStorage.getItem('users'))[userId].cart;

    let statusProducts;
    async function getAllProducts() {
        try {
            let response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
            statusProducts = response.status;
            response = await response.json();
            return response;
        } catch (error) {
            console.log(error?.message);
        }
    }
    async function displayProducts() {
        let data = (await getAllProducts()).data;

        console.log(data);


        productsRow.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            productsRow.innerHTML += `<div class="card w-full sm:w-6/12 md:w-4/12 lg:w-3/12">
                                <div class="inner h-full p-3 rounded-md shadow-md flex flex-col justify-between border-2">
                                    <div class="head">
                                        <img src=${data[i].imageCover} class="w-full rounded-md shadow-md mb-3 duration-300" alt="">
                                        <h3 class=" text-h2 text-center overflow-hidden text-nowrap text-ellipsis">${data[i].title}</h3>
                                        <p class="line-clamp-5 mb-4 text-[#7d7d7d]">
                                            ${data[i].description}
                                        </p>
                                        <div class="mb-3 capitalize">
                                            <span>price : </span>
                                            <span>${data[i].price}EGP</span>
                                        </div>
                                    </div>
                                    <button ${cart.filter((elem) => elem.data.id == data[i].id).length ? 'disabled' : ''}  class=" ${cart.filter((elem) => elem.data.id == data[i].id).length ? 'carted' : ''} border-2  rounded-md py-1 px-2 hover:bg-[#E3E3E3] duration-300 capitalize" >
                                        ${cart.filter((elem) => elem.data.id == data[i].id).length ? 'in your cart' : 'add to cart'}
                                        <i class="fa-solid fa-cart-shopping inline-block align-middle"></i>
                                    </button>
                                </div>
                            </div>`;

        }

        document.querySelectorAll('.page .products .row .inner button').forEach((btn, i) => {
            btn.addEventListener('click', function (e) {
                addToCart(e, data[i]);
            })
        });
    }
    displayProducts();

    function addToCart(e, data) {

        cart.push({ data, number: 1 });
        users = JSON.parse(localStorage.getItem('users'));

        users = users.map((elem, i) => userId == i ? { ...elem, cart } : elem);
        localStorage.setItem('users', JSON.stringify(users));
        e.currentTarget.innerHTML = `in your cart
                                        <i class="fa-solid fa-cart-shopping inline-block align-middle"></i>`;
        e.currentTarget.classList.add('carted');
        e.currentTarget.setAttribute('disabled', '');
    }
    //------------------------------------------------------------------------------------------------------------------------

}
//----------------------------------------------------------------------------------------------------------------------------

// start cart
if (cartRow) {
    let userId = JSON.parse(localStorage.getItem('token')).id;
    let cart = JSON.parse(localStorage.getItem('users'))[userId].cart;

    console.log(cart);


    function displayCart() {
        cartRow.innerHTML = '';
        let totalPrice = 0;
        for (let i = 0; i < cart.length; i++) {
            console.log(cart[i].data.price, cart[i].number);
            
            totalPrice += (cart[i].data.price * cart[i].number); 
            cartRow.innerHTML += `<div class="card w-full sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12 opacity-0 translate-y-10">
                                <div class="inner h-full p-3 rounded-md shadow-md flex flex-col justify-between border-2">
                                    <div class="head">
                                        <img src=${cart[i].data.imageCover} class="w-full rounded-md shadow-md mb-3 duration-300" alt="">
                                        <h3 class=" text-h2 text-center overflow-hidden text-nowrap text-ellipsis">${cart[i].data.title}</h3>
                                        <p class="line-clamp-5 mb-4 text-[#7d7d7d]">
                                            ${cart[i].data.description}
                                        </p>
                                        
                                    </div>
                                    <div>
                                        <div class="mb-3 capitalize">
                                            <span>price : </span>
                                            <span>${cart[i].data.price}EGP</span>
                                        </div>
                                        <button class="w-full bg-red-600 rounded-md py-1 px-2 capitalize hover:bg-red-700 duration-500">remove</button>
                                        <ul class="flex justify-center mt-4">
                                            <li class="size-6 bg-gray-400 xy-center rounded-full mx-2 cursor-pointer hover:bg-slate-500 duration-300" onclick="plusProduct(event, '${cart[i].data.id}')">
                                                <i class="fa-solid fa-plus"></i>
                                            </li>
                                            <span>
                                                ${cart[i].number}
                                            </span>
                                            <li class="size-6 bg-gray-400 xy-center rounded-full mx-2 cursor-pointer hover:bg-slate-500 duration-300" onclick="minusProduct(event, '${cart[i].data.id}')">
                                                <i class="fa-solid fa-minus"></i>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>`;
        }

        if(!cart.length){
            cartRow.innerHTML = '<p class="text-white">your cart is empty.</p>'
        }

        cartRow.parentElement.previousElementSibling.innerHTML = totalPrice + 'EGP';

        document.querySelectorAll('.cart .card .inner button').forEach((btn, i) => {
            btn.addEventListener('click', function () {
                removeProductCart(cart[i].data.id);
            })
        });


        handleScrollCart();
    }

    function removeProductCart(id) {
        cart = cart.filter((elem, i) => elem.data.id !== id);

        let tempUsers = JSON.parse(localStorage.getItem('users'));

        tempUsers = tempUsers.map((elem, i) => i == JSON.parse(localStorage.getItem('token')).id ? { ...elem, cart } : elem);
        localStorage.setItem('users', JSON.stringify(tempUsers));
        displayCart();
    }

    function plusProduct(e, id) {
        console.log(id, cart);
        cart = cart.map((elem, i) => elem.data.id == id ? { ...elem, number: elem.number + 1 } : elem);
        let tempUsers = JSON.parse(localStorage.getItem('users'));
        tempUsers[userId].cart = cart;
        localStorage.setItem('users', JSON.stringify(tempUsers));

        e.currentTarget.nextElementSibling.innerHTML = Number(e.currentTarget.nextElementSibling.innerHTML) + 1;
        displayCart();
    }
    function minusProduct(e, id) {
        if (e.currentTarget.previousElementSibling.innerHTML > 1) {
            cart = cart.map((elem, i) => elem.data.id == id ? { ...elem, number: elem.number - 1 } : elem);
            let tempUsers = JSON.parse(localStorage.getItem('users'));
            tempUsers[userId].cart = cart;
            localStorage.setItem('users', JSON.stringify(tempUsers));

            e.currentTarget.previousElementSibling.innerHTML = Number(e.currentTarget.previousElementSibling.innerHTML) - 1;
            displayCart();
        }
    }


    displayCart();
}
//----------------------------------------------------------------------------------------------------------------------------

// special-heading scroll animation
const handleScrollSpecialHeading = () => {
    for (let i = 0; i < specialHeading.length; i++) {
        if ((this.scrollY > specialHeading[i].offsetTop - this.innerHeight + 20)) {
            specialHeading[i].classList.add('show');
        }
    }
}
handleScrollSpecialHeading();
//------------------------------------------------------------------------------------------------------------------------

// handle scroll to show cart products
function handleScrollCart() {
    for (let i = 0; i < cartRow.children.length; i++) {
        if (window.scrollY > cartRow.children[i].offsetTop - window.innerHeight + 100) {
            cartRow.children[i].style.cssText = `opacity : 1 !important;
                                                transform : translateY(0px) !important;`
        }
    }
}
//------------------------------------------------------------------------------------------------------------------------

window.addEventListener('scroll', function () {
    handleScrollSpecialHeading();
    if (this.scrollY > 100)
        up.style.cssText = `opacity : 1 !important;
                            pointer-events: all !important;`;
    else
        up.removeAttribute('style');

    if (cartRow) {
        handleScrollCart();
    }
});

// handle up scroll

up.addEventListener('click', function () {
    window.scrollTo(0, 0);
})

//------------------------------------------------------------------------------------------------------------------------


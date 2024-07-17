/**
 * Student: Exenreco Bell
 * Class: Web200
 * Description: This script is implementation for dynamic spotlight interactions only!
 */


const 


// Array of spotlight like/comments starter values
numbers = [1, 2, 3, 4, 5],

// Function to get a cookie by name
getCookie = (function(name)
{
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}),

setCookie = (function( name, value, options = {} )
{
    options = {
        path: '/',
        // add other defaults if necessary
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}),

nav_template = ( likes, comments ) => {
    return `
    <nav class="spotlight-nav">
        <div class="more">
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <ul class="nav-list">
            <li class="nav-item">
                <div class="likes-settings">
                    <i class="likes-toggle fa-solid fa-thumbs-up"></i><br>
                    <span class="likes">` + likes + `</span>
                </div>
            </li>
            <li class="nav-item">
                <div class="dislike-settings">
                    <i class="dislikes-toggle fa-solid fa-thumbs-down"></i><br>
                    <span>Dislike</span>
                </div>
            </li>
            <li class="nav-item">
                <div class="comments-settings">
                    <i class="comments-toggle fa-solid fa-comment"></i><br>
                    <span>` + comments + `</span>
                </div>
                
            </li>
            <li class="nav-item">
                <div class="share-settings">
                    <i class="share-toggle fa-solid fa-share"></i><br>
                    <span>Share</span>
                </div>
            </li>
        </ul>
    </nav>
    `;
},

popupTemplate       = (( title, content ) => {
    let
    main        = '<main class="popup-content">' + title + content + '</main>',
    overlay     = '<div class="popup-overlay"></div>',
    module      = '<div class="popup-module">' + overlay + main + '</div>';

    return module;
}),


moreTemplate        = (() => {
}),

shareTemplate       = (() => {
    let 
    links   = `<ul class="social-list">`,
    socials = [ 'x', 'facebook', 'instagram', 'linkedin' ];

    socials.forEach((social, index) => {
        (social === 'x') ? links += `
            <li>
                <a href="https://www.` + social + `.com" target="_blank">
                    <i class="fa-brands fa-x-twitter"></i>
                </a>
            </li>
        `: null;

        (social === 'facebook') ? links += `
            <li>
                <a href="https://www.` + social + `.com" target="_blank">
                    <i class="fa-brands fa-facebook-f"></i>
                </a>
            </li>
        `: null;

        (social === 'instagram') ? links += `
            <li>
                <a href="https://www.` + social + `.com" target="_blank">
                    <i class="fa-brands fa-instagram"></i>
                </a>
            </li>
        `: null;

        (social === 'linkedin') ? links += `
            <li>
                <a href="https://www.` + social + `.com" target="_blank">
                    <i class="fa-brands fa-linkedin-in"></i>
                </a>
            </li>
        `: null;
    });
    return links.concat('</ul>');
}),

commentsTemplate    = (( comments = [{ name: '', imgSrc: '', comment: '' }] ) => {
    let items = '';

    comments.forEach((comment, index) => {
        items += (`
            <li class='comment'>
                <section class='header'>
                    <img src='` + comment.imgSrc + `' alt='image of ` + comment.name + `.'>
                    <h6>` + comment.name + `</h6>
                </section>
                <div class='text'>` + 
                    comment.comment + 
                    `<div class="action">
                        <i class="fa-solid fa-thumbs-up"></i>
                        <i class="fa-solid fa-thumbs-down"></i>
                        <i class="fa-solid fa-comment"></i>
                    </div>
                </div>
            </li>
        `);
    });

    const commentBlock = `
        <div class="">
            <ul class="comment-tree">` + items + `</ul>
            <div class="comment-form">
                <input type="text" placeholder="Comment">
                <i class="fa-solid fa-paper-plane"></i>
            </div>
        </div>
    `;

    return commentBlock;
}),


// Function to initialize spotlight features
spotlight_likes = (() => {

    document.addEventListener('DOMContentLoaded', (event) => {

        const 
        navOptions      = nav_template('5k', '1.2k'),
        spotlightItems  = document.querySelectorAll('.spotlight-item'),
        states          = [];
        

        spotlightItems.forEach((item, index) => {

            states[index] = {
                'liked': false,
                'disliked': false,
                'counter': 0
            };
            

            item.addEventListener('mouseenter', (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();

                if( ! item.querySelector('.spotlight-nav') ) {
                    item.insertAdjacentHTML('afterbegin', navOptions);
                }

                let
                module          = item.querySelector('.popup-module'),
                likesToggle     = item.querySelector('.likes-toggle'),
                dislikesToggle     = item.querySelector('.dislikes-toggle'),
                commentToggle   = item.querySelector('.comments-toggle'),
                shareToggle     = item.querySelector('.share-toggle'),
                counter         = (states[index]['counter']) ? states[index]['counter'] : 0;

                if( states[index]['liked'] === true ) {
                    likesToggle.classList.add('liked');
                }
                if( states[index]['disliked'] === true ) {
                    dislikesToggle.classList.add('liked');
                }

                // Event controls comment features
                likesToggle.addEventListener('click', (e) => {
                    e.stopImmediatePropagation();
                    counter++;
                    if( counter === 1 )
                    {
                        states[index]['liked'] = true;
                        likesToggle.classList.add('liked');

                        // reset dislikes
                        states[index]['disliked']   = false;
                        dislikesToggle.classList.remove('liked');
                    }
                    else if( counter === 2)
                    {
                        states[index]['liked'] = false;
                        likesToggle.classList.remove('liked');
                        counter = 0;
                    }

                    // if number of clicks greater or is 2 reset otherwise do nothing
                    ( counter >= 2 ) ? counter = 0 : counter = counter;

                    states[index]['counter'] = counter;

                });

                // Event controls comment features
                dislikesToggle.addEventListener('click', (e) => {
                    e.stopImmediatePropagation();
                    //counter++;
                    dislikesToggle.classList.toggle('liked');

                    // reset likes
                    states[index]['liked']      = false;
                    states[index]['counter']    = 0;
                    states[index]['disliked']   = true;
                    likesToggle.classList.remove('liked');
                });


                // Event controls comment features
                commentToggle.addEventListener('click', (e) => {
                    e.stopImmediatePropagation();
                    item.insertAdjacentHTML('afterbegin', popupTemplate(
                        '<h4>Comments</h4><hr/>',
                        commentsTemplate([
                            {name: 'Exenreco', imgSrc: './images/exenreco.png', comment: 'Hello!'},
                            {name: 'Exenreco', imgSrc: './images/exenreco.png', comment: 'Hi!'},
                            {name: 'Exenreco', imgSrc: './images/exenreco.png', comment: 'Hello!'}
                        ])
                    ));

                    // Event: Controls closing share window by clicking overlay
                    item.querySelector('.popup-overlay').addEventListener('click', (e) => {
                        item.querySelector('.popup-module').remove();
                        return;
                    });
                });

                // Event: Controls share features popup
                shareToggle.addEventListener('click', (e) => {
                    e.stopImmediatePropagation();
                    item.insertAdjacentHTML('afterbegin', popupTemplate(
                        '<h4>Share</h4><hr/>',
                        shareTemplate() + 
                        `
                        <hr/>
                        <div>
                            <span><i class="fa-solid fa-copy"></i> Copy Link</span><br>
                            <span><i class="fa-solid fa-share-from-square"></i> Quick Share</span>
                        </div>`
                    ));

                    // Event: Controls closing share window by clicking overlay
                    item.querySelector('.popup-overlay').addEventListener('click', (e) => {
                        item.querySelector('.popup-module').remove();
                        return;
                    });
                });

            });

            item.addEventListener('mouseleave', (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();

                if( item.querySelector('.spotlight-nav') ) {
                    item.querySelector('.spotlight-nav').remove();
                }
            });
        });

        /*const menu = document.querySelectorAll('.spotlight-nav');

        if ( ! menu ) {
            console.warn('no spotlight item found, killing spotlight script!');
            return;
        }

        menu.forEach((nav, index) => {
            let 
            // select elements html elements
            more_toggle         = menu[index].querySelector('.more'),
            likes_toggle        = menu[index].querySelector('.likes-toggle'),
            likes_context       = menu[index].querySelector('.likes'),
            dislike_toggle      = menu[index].querySelector('.dislikes-toggle'),
            comments_toggle     = menu[index].querySelector('.comments-toggle'),
            share_toggle        = menu[index].querySelector('.share-toggle'),
            
            // current values
            numberOfLikes       = '',
            numberOfComments    = '';

            // Events that controls what happens when more icon is clicked
            more_toggle.addEventListener('click', (e) => {
                const
                // more template
                options = popupTemplate(
                    'Settings<hr/>',
                    '<ul>'
                        + '<li><i class="fa-regular fa-eye-slash"></i> Hide</li>'
                        + '<li><i class="fa-solid fa-bug"></i> Report</li>' +
                    '</ul>'
                );

                // add more template
                nav.insertAdjacentHTML('beforebegin', options);

                const
                module = nav.parentNode.querySelector('.popup-module'),
                overlay = nav.parentNode.querySelector('.popup-overlay');

                // controls closing more module
                overlay.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    module.remove();
                    return;
                });
            });


            likes_toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
            });

            dislike_toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
            });

            comments_toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();

                const comments = popupTemplate(
                    '<h3>Comments</h3><hr>',
                    commentsTemplate(
                        'Exenreco Bell',
                        './images/exenreco.png',
                        'hello world!'
                    ) +
                    commentsTemplate(
                        'Exenreco Bell',
                        './images/exenreco.png',
                        'hello world!'
                    ) +
                    commentsTemplate(
                        'Exenreco Bell',
                        './images/exenreco.png',
                        'hello world!'
                    )
                );

                nav.insertAdjacentHTML('beforebegin', comments);

                const
                module = nav.parentNode.querySelector('.popup-module'),
                overlay = nav.parentNode.querySelector('.popup-overlay');

                // controls closing more module
                overlay.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    module.remove();
                    return;
                });

            });
        });*/







        /*const likes_block = document.querySelectorAll('.likes-settings');

        if( ! likes_block ) {
            console.warn('No spotlight likes block found.');
            return;
        }

        likes_block.forEach((block, index) => {
            
            let 
            likes           = likes_block[index].querySelector('.likes'),    // what needs to be updated
            toggle          = likes_block[index].querySelector('.toggle'),   // triggers update
            clickCount      = 0,
            currentNumber   = getCookie('currentNumber');

            if ( ! currentNumber ) {
                currentNumber = numbers[0];
                setCookie('currentNumber', currentNumber);
            }
            
            likes.textContent = currentNumber;

            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                clickCount++;

                if (clickCount === 1) {
                    currentNumber = parseInt(likes.textContent) + 1;
                } else if (clickCount === 2) {
                    currentNumber = parseInt(likes.textContent) - 1;
                }

                toggle.classList.toggle('liked');
                likes.textContent = currentNumber;
                setCookie('currentNumber', currentNumber);

                // if number of clicks greater or is 2 reset otherwise do nothing
                ( clickCount >= 2 ) ? clickCount = 0 : clickCount = clickCount;
            });
        });*/
    });

}),

/**
 * Initialize Spotlight
 * 
 * All features that controls how spotlight 
 * stories operates. Intended for homepage 
 * & spotlight page
 * 
 * @type function
 * @since version 0.0.52
 * @returns null
 */
initializeSpotlight = (() => {
    spotlight_likes(); // initialize like features
    return null;
});

// Initialize the span element when the page loads
window.onload = initializeSpotlight();
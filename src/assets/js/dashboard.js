"use strict";

document.addEventListener("DOMContentLoaded", function () {
    // ------------------------------------------------------- //
    // Sidebar
    // ------------------------------------------------------ //

    // const sidebarToggler = document.querySelector(".sidebar-toggler");

    // if (sidebarToggler) {
    //     sidebarToggler.addEventListener("click", function (e) {
    //         e.preventDefault();

    //         document.querySelector(".sidebar").classList.toggle("shrink");
    //         document.querySelector(".sidebar").classList.toggle("show");
    //     });
    // }

    // ------------------------------------------------------- //
    // Search Dropdown Menu
    // ------------------------------------------------------ //

    const searchFormControl = document.getElementById("searchInput");
    const dropdownMenu = document.getElementById("searchDropdownMenu");

    if (searchFormControl && dropdownMenu) {
        searchFormControl.addEventListener("focus", function (e) {
            var dropdownMenus = [].slice.call(
                document.querySelectorAll(".dropdown-menu.show:not(#searchDropdownMenu)")
            );
            dropdownMenus.map(function (dropdownMenu) {
                dropdownMenu.classList.remove("show");
            });

            dropdownMenu.classList.add("d-block");
        });
        document.addEventListener("click", function (e) {
            if (e.target.id == "searchInput" || e.target.closest("#searchDropdownMenu")) {
                dropdownMenu.classList.add("d-block");
            } else {
                dropdownMenu.classList.remove("d-block");
            }
        });
    }

    // ------------------------------------------------------- //
    // Init Tooltips
    // ------------------------------------------------------ //

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

$({ Counter: 0 }).animate({
    Counter: $('.Single').text()
}, {
    duration: 1000,
    easing: 'swing',
    step: function () {
        $('.Single').text(Math.ceil(this.Counter));
    }
});


// var currentStep = 1;
// var updateProgressBar;

// function displayStep(stepNumber) {
//     if (stepNumber >= 1 && stepNumber <= 5) {
//         $(".step-" + currentStep).hide();
//         $(".step-" + stepNumber).show();
//         currentStep = stepNumber;
//         updateProgressBar();
//     }
// }

// $(document).ready(function () {
//     $('#multi-step-form').find('.step').slice(1).hide();

//     $(".next-step").click(function () {
//         if (currentStep < 5) {
//             $(".step-" + currentStep).addClass("animate__animated animate__fadeOutLeft");
//             currentStep++;
//             setTimeout(function () {
//                 $(".step").removeClass("animate__animated animate__fadeOutLeft").hide();
//                 $(".step-" + currentStep).show().addClass("animate__animated animate__fadeInRight");
//                 updateProgressBar();
//             }, 500);
//         }
//     });

//     $(".prev-step").click(function () {
//         if (currentStep > 1) {
//             $(".step-" + currentStep).addClass("animate__animated animate__fadeOutRight");
//             currentStep--;
//             setTimeout(function () {
//                 $(".step").removeClass("animate__animated animate__fadeOutRight").hide();
//                 $(".step-" + currentStep).show().addClass("animate__animated animate__fadeInLeft");
//                 updateProgressBar();
//             }, 500);
//         }
//     });

//     updateProgressBar = function () {
//         var progressPercentage = ((currentStep - 1) / 2) * 100;
//         $(".progress-bar").css("width", progressPercentage + "%");
//     }
// });



// var timeline = anime.timeline({
//     autoplay: true,
//     direction: "alternate",
//     loop: true
// });

// timeline
//     .add({
//         targets: "path",
//         d: {
//             value: [
//                 "M 7.7423617,6.5524041 C 0.14213171,13.241204 -0.28352929,25.218399 6.5488487,32.446038 13.237649,40.04627 24.578354,40.568996 32.442483,33.639553 39.813699,26.434583 40.216105,14.96193 33.635997,7.7459191 26.935569,0.39795815 15.101951,-0.40029585 7.7423617,6.5524041 Z",
//                 "M 1.4639006,1.6816009 C 1.4129866,11.374999 1.1386316,31.038516 1.2037966,39.132841 10.361482,39.005187 29.91693,39.467197 38.833611,39.035804 39.621131,30.764045 38.910573,9.4542879 39.093715,1.2274189 30.247144,1.2462399 8.8125376,1.8724369 1.4639006,1.6816009 Z"
//             ],
//             duration: 1500,
//             easing: "easeInOutQuad"
//         },
//         offset: 0
//     })
//     .add({
//         targets: ".shape1",
//         fill: {
//             value: ["#2095F2", "#4BAF4F"],
//             duration: 1500,
//             easing: "easeInOutQuad"
//         },
//         offset: 0
//     })
//     .add({
//         targets: "path",
//         d: {
//             value: [
//                 "M 1.4639006,1.6816009 C 1.4129866,11.374999 1.1386316,31.038516 1.2037966,39.132841 10.361482,39.005187 29.91693,39.467197 38.833611,39.035804 39.621131,30.764045 38.910573,9.4542879 39.093715,1.2274189 30.247144,1.2462399 8.8125376,1.8724369 1.4639006,1.6816009 Z",
//                 "M 19.499615,1.5030295 C 15.341558,11.017856 5.4243459,31.217087 1.2037966,39.132841 10.361482,39.005187 29.91693,39.467197 38.833611,39.035804 34.978274,30.942616 24.624859,11.418574 20.165144,1.5845618 18.73688,1.6665173 20.913606,1.4728946 19.499615,1.5030295 Z"
//             ],
//             duration: 1500,
//             easing: "easeInOutQuad"
//         },
//         offset: 1500
//     })
//     .add({
//         targets: ".shape1",
//         fill: {
//             value: ["#4BAF4F", "#F44236"],
//             duration: 1500,
//             easing: "easeInOutQuad"
//         },
//         offset: 1500
//     })
//     .add({
//         targets: "path",
//         d: {
//             value: [
//                 "M 19.499615,1.5030295 C 15.341558,11.017856 5.4243459,31.217087 1.2037966,39.132841 10.361482,39.005187 29.91693,39.467197 38.833611,39.035804 34.978274,30.942616 24.624859,11.418574 20.165144,1.5845618 18.73688,1.6665173 20.913606,1.4728946 19.499615,1.5030295 Z",
//                 "M 7.7423617,6.5524041 C 0.14213171,13.241204 -0.28352929,25.218399 6.5488487,32.446038 13.237649,40.04627 24.578354,40.568996 32.442483,33.639553 39.813699,26.434583 40.216105,14.96193 33.635997,7.7459191 26.935569,0.39795815 15.101951,-0.40029585 7.7423617,6.5524041 Z"
//             ],
//             duration: 1500,
//             easing: "easeInOutQuad"
//         },
//         offset: 3000
//     })
//     .add({
//         targets: ".shape1",
//         fill: {
//             value: ["#F44236", "#2095F2"],
//             duration: 1500,
//             easing: "easeInOutQuad"
//         },
//         offset: 3000
//     });

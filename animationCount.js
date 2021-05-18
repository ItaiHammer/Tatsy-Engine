export default function animationCount(animationAmount) {
    const shownAnimationArray = localStorage.getItem('animations').split('&');
    const text = `${
        typeof shownAnimationArray === 'string' ? 1 : shownAnimationArray.length
    }/${animationAmount}`;

    const animationCount = document.querySelector('#animation-count');
    const animationCountText = document.querySelectorAll(
        '#animation-count-text'
    );

    animationCount.innerHTML = text;
    animationCountText.forEach((element) => (element.style.opacity = 1));

    if (
        typeof shownAnimationArray === 'string'
            ? 1
            : shownAnimationArray.length === animationAmount
    ) {
        animationCount.style.color = '#CBBC93';
    }

    console.log(localStorage.getItem('animations').split('&'));
}

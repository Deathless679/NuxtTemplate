export function formatDate(date, locales = 'ru-RU') {
    return new Intl.DateTimeFormat(locales).format(new Date(date));
}

export function formatNumWords(value, words) {
    value = Math.abs(value) % 100;
    const num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num === 1) return words[0];
    return words[2];
}


export function useClickOutside(targetEl, callbackFn) {
    if (!targetEl) return;
    let listener = e => {
        if (
            e.target === targetEl.value ||
            e.composedPath().includes(targetEl.value)
        ) {
            return;
        }
        if (typeof callbackFn === 'function') {
            callbackFn();
        }
    };
    onMounted(() => {
        window.addEventListener('click', listener);
    });
    onBeforeUnmount(() => {
        window.removeEventListener('click', listener);
    });
    return {
        listener,
    };
}

export function debounce(fn, wait) {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer); // clear any pre-existing timer
        }
        timer = setTimeout(() => {
            fn.apply(this, args); // call the function if time expires
        }, wait);
    };
}
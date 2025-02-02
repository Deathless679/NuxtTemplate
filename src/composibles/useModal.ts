import ModalWrapper from '~/components/modal/modal-wrapper.vue';
import type { CompilerOptions } from '@vue/compiler-dom';
import type { RenderFunction } from 'vue';

interface ModalItem {
  key: symbol;
  component: () => (template: string | HTMLElement, options: CompilerOptions) => RenderFunction
}

export const modalsList = ref<ModalItem[] | never[]>([]);

const wrapperComponent: never = ModalWrapper;

const defaultOptions = {
  wrapperComponent,
  wrapperOptions: {
    title: 'Default',
  },
};

function openModal(component: HTMLElement | string, props = {}, options = defaultOptions) {
  return new Promise((resolve, reject) => {
    const modalInstance: ModalItem = {
      key: Symbol('modal'),
      component: () => h(options.wrapperComponent, {
        component: component,
        componentProps: props,
        ...options.wrapperOptions,
        onClose: () => {
          handlerRemove(resolve, modalInstance.key);
        },
        onSubmit: (response) => {
          handlerRemove(resolve.bind(null, response), modalInstance.key);
        },
        onError: () => {
          handlerRemove(reject, modalInstance.key);
        },
      }),
    };
    modalsList.value.push(modalInstance);
  });
}


function handlerRemove(callback, key) {
  modalsList.value = modalsList.value.filter(el => el.key !== key);
  callback();
}

export default openModal;
import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Modal from '@/components/Util/Modal.vue'
import { VDialog } from 'vuetify/lib';

const store = {
  visible: false,
  type: null,
  header: null,
  content: null,
  cancel: null,
  ok: null,
  okDisabled: null,
  value: null,
  onOk: null,
  onCancel: null
};

//v-dialog
describe('components/Util/Modal.vue', () => {
  it('appears and disappears on state change', () => {
    const wrapper = mount(Modal, {
      mocks:{
        $store: {
          state: {
            utilModal: store
          }
        }
      },
      computed: {
        vuexModel:{
          get(){
            return store.visible;
          },
          set(value){
            store.visible = value;
          }
        }
      },
      stubs: {
        vAlert: true,
        vSpacer: true,
        vBtn: true,
        vDialog: VDialog
      }
    });

    expect(wrapper.find(VDialog).exists()).to.be.false;

    store.visible = true;

    expect(wrapper.find(VDialog).exists()).to.be.true;
  })
});
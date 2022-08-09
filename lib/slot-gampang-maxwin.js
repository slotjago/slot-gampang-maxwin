'use babel';

import SlotGampangMaxwinView from './slot-gampang-maxwin-view';
import { CompositeDisposable } from 'atom';

export default {

  slotGampangMaxwinView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotGampangMaxwinView = new SlotGampangMaxwinView(state.slotGampangMaxwinViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotGampangMaxwinView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-gampang-maxwin:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotGampangMaxwinView.destroy();
  },

  serialize() {
    return {
      slotGampangMaxwinViewState: this.slotGampangMaxwinView.serialize()
    };
  },

  toggle() {
    console.log('SlotGampangMaxwin was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

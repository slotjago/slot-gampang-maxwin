'use babel';

import SlotGampangMaxwin from '../lib/slot-gampang-maxwin';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('SlotGampangMaxwin', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('slot-gampang-maxwin');
  });

  describe('when the slot-gampang-maxwin:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.slot-gampang-maxwin')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'slot-gampang-maxwin:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.slot-gampang-maxwin')).toExist();

        let slotGampangMaxwinElement = workspaceElement.querySelector('.slot-gampang-maxwin');
        expect(slotGampangMaxwinElement).toExist();

        let slotGampangMaxwinPanel = atom.workspace.panelForItem(slotGampangMaxwinElement);
        expect(slotGampangMaxwinPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'slot-gampang-maxwin:toggle');
        expect(slotGampangMaxwinPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.slot-gampang-maxwin')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'slot-gampang-maxwin:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let slotGampangMaxwinElement = workspaceElement.querySelector('.slot-gampang-maxwin');
        expect(slotGampangMaxwinElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'slot-gampang-maxwin:toggle');
        expect(slotGampangMaxwinElement).not.toBeVisible();
      });
    });
  });
});

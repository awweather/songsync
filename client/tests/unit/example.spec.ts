import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import PostComponent from "@/components/PostComponent.vue";

describe("PostComponent.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(PostComponent, {
      propsData: { msg }
    });
    expect(wrapper.text()).to.include(msg);
  });
});

import { showModel, toast } from "~/composables/util";
import { logout, updatepassword } from "~/api/manager";
import { useStore } from "vuex";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

export function useRepassword() {
  const store = useStore();
  const router = useRouter();

  //修改密码
  const formDrawerRef = ref(null);
  const formRef = ref(null);

  const rules = {
    oldpassword: [
      { required: true, message: "旧密码不能为空", trigger: "blur" },
    ],
    password: [{ required: true, message: "新密码不能为空", trigger: "blur" }],
    repassword: [
      { required: true, message: "确认密码不能为空", trigger: "blur" },
    ],
  };
  const form = reactive({
    oldpassword: "",
    password: "",
    repassword: "",
  });

  const onSubmit = () => {
    formRef.value.validate((valid) => {
      if (!valid) {
        return false;
      }
      formDrawerRef.value.showLoading();
      updatepassword(form)
        .then((res) => {
          toast("修改密码成功，请重新登录");
          store.dispatch("logout");
          store.dispatch("logout");
          //跳转回登录页
          router.push("/login");
        })
        .finally(() => {
          formDrawerRef.value.hideLoading();
        });
    });
  };
  const openRepasswordForm = () => formDrawerRef.value.open();
  return {
    formDrawerRef,
    form,
    rules,
    formRef,
    onSubmit,
    openRepasswordForm,
  };
}

//退出登录
export function useLogout() {
  const store = useStore();
  const router = useRouter();
  function handleLogout() {
    showModel("是否要退出登录").then((res) => {
      logout().finally(() => {
        store.dispatch("logout");
        //跳转回登录页
        router.push("/login");
        //提示退出登录成功
        toast("退出登录成功");
      });
    });
  }
  return {
    handleLogout,
  };
}

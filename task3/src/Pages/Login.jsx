// import { logInAPI } from "@/api/auth";
// import { logInAndRegisterSchema } from "@/forms/schema";
// import { useAuthStore } from "@/store/auth";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import qs from "qs";
// import { useLocation, useNavigate } from "react-router-dom";
// export default function Login() {
//   const { search } = useLocation();
//   const { redirectTo } = qs.parse(search, { ignoreQueryPrefix: true });
//   const navigate = useNavigate();
//   const { setTokens } = useAuthStore();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(logInAndRegisterSchema),
//   });
//   const onSubmit = async (data) => {
//     try {
//       const res = await logInAPI(data);
//       setTokens(res.data);
//       navigate(redirectTo ?? "/");
//     } catch (e) {
//       console.error(e);
//     } finally {
//       // reset();
//     }
//   };
//   return (
//     <div className="text-center">
//       <h2>Login Page (Form goes here)</h2>
//       <div>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="">
//             <label htmlFor="email">Email :</label>{" "}
//             <input id="email" type="email" {...register("email", {})} />
//             <p style={{ color: "orange" }}>{errors?.email?.message}</p>
//           </div>

//           <div className="">
//             <label htmlFor="password">Password :</label>{" "}
//             <input type="password" {...register("password", {})} />
//             <p style={{ color: "orange" }}>{errors?.password?.message}</p>
//           </div>
//           <div className="">
//             <input type="submit" value="log in" />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }





import { loginSchema } from "@/forms/schema"; // ✅ use loginSchema
import { logInAPI } from "@/api/auth";
import { useAuthStore } from "@/store/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const { search } = useLocation();
  const { redirectTo } = qs.parse(search, { ignoreQueryPrefix: true });
  const navigate = useNavigate();
  const { setTokens } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await logInAPI(data);
      setTokens(res.data);
      navigate(redirectTo ?? "/");
    } catch (e) {
      console.error(e);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-4">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="form-label">Email</label>
          <input type="email" className="form-control" {...register("email")} />
          <p className="text-danger">{errors?.email?.message}</p>
        </div>

        <div>
          <label className="form-label">Password</label>
          <input type="password" className="form-control" {...register("password")} />
          <p className="text-danger">{errors?.password?.message}</p>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

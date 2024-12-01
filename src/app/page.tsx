import Button from "@/components/Button";
import Input from "@/components/Input";
import { getSession, login } from "@/controller/authController";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <main className="bg-slate-100 rounded shadow p-5">
        <h1 className="text-2xl font-semibold">CueLightHub</h1>
        <p className="my-2">
          A theatrical cue light controller using open-source hardware.
        </p>
        <div className="flex flex-col gap-2">
          <form
            action={async (formData) => {
              "use server";
              await login(formData);
              redirect("/");
            }}
          >
            <Input label="Email" name="email" />
            <Input label="Password" name="password" type="password" />
            <Button>Sign in</Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;

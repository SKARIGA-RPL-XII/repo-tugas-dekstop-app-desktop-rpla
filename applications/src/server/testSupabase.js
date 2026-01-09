import { supabase } from "./config/supabase.js";

const test = async () => {
  const { data, error } = await supabase.from("users").select("*");
  console.log({ data, error });
};

test();

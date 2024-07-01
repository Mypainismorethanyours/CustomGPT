import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Box, Button, Group, Title } from "@mantine/core";
import {
  IconMessagePlus, IconMouse
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { OPENAI_END_POINT } from "@/utils/constant";



const showNotification = (message: string, type: string) => {
  notifications.show({
    id: type,
    title: type,
    message,
    color: type === 'Success' ? "green" : 'red',
    autoClose: 3000,
  });
};

function OpenAIKey() {
  const form = useForm({ initialValues: { apiKey: "" } });
  useEffect(() => {
    const storedValue = window.localStorage.getItem("OPENAI_API_KEY");
    if (storedValue) {
      try {
        form.setValues(JSON.parse(storedValue));
      } catch (e) {
        console.log("Failed to parse stored OPENAI API KEY");
      }
    }
  }, []);
  const submitKey = async () => {
    if (form.getInputProps("apiKey").value.length > 50) {
      // apiKey
      window.localStorage.setItem("OPENAI_API_KEY", JSON.stringify(form.getInputProps("apiKey")))
      // Obtain apiKey
      const apiKey = JSON.parse(window.localStorage.getItem("OPENAI_API_KEY") || "{}")?.value



      const resp = await fetch(
        `${process.env.END_POINT ?? OPENAI_END_POINT}/v1/chat/completions`,
        {
          headers: {
            // Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{ "role": "user", "content": "Say this is a test!" }],
            "temperature": 0.7
          }),
        }
      );
      if (resp.status == 401) {
        return showNotification("Verification failed, 查find your API key at https://platform.openai.com/account/api-keys", 'Error');

      } else if (resp.status == 400 || resp.status == 200) {

        showNotification("API Key verification successful, entering the system in 3 seconds.", 'Success');
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
      console.log(resp.status);

      const data = await resp.json();
      console.log(data);
      // window.location.href = "/";
      //;
    } else {
      showNotification("Please enter the correct API Key.", 'Error');
      form.getInputProps("apiKey").onFocus();
    }

  }
  // useEffect(() => {

  // }, [form.values]);

  return (
    <Box maw={820} mx="auto" className="mt-20  rounded-lg bg-grey-50	  border-green-400	 p-10 login shadow-2xl py-20">
      <Title order={1} className="text-4xl font-bold text-center mb-10 logo  flex justify-center items-center">
        <span> Welcome to using CustomGPT </span>
        <IconMessagePlus color="#f60" size={48} className="ml-3" />
      </Title >
      <TextInput
        label="Please enter your API Key"
        placeholder="OPENAI API Key"
        withAsterisk
        labelProps={{ className: "text-lg font-bold my-2" }}
        {...form.getInputProps("apiKey")}
      />
      <Group position="center" mt="xl">
        <Button
          variant="outline"
          onClick={submitKey}
        >
          Submit
          <IconMouse color="#40c057" size={18} className="ml-2" />

        </Button>
      </Group>
    </Box>
  );
}
export default OpenAIKey;

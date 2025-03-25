"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { get_download_link } from "@/lib/server_funcs"
import { useForm } from "react-hook-form"
import { set, z } from "zod"

// import { toast } from "@/components/hooks/use-toast"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useState } from "react"

const FormSchema = z.object({
    url: z.string().url({
        message: "Please enter a valid URL.",
    }),
})

export function InputForm({set_video_data}) {

    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            url: "",
        },
    })

    async function onSubmit(data) {
        setLoading(true);

        const resp_data = await get_download_link(data["url"]);
        set_video_data(resp_data);

        if (resp_data["context"] === "error"){
            toast.error("Error", {
                description: resp_data["message"],
            })
            return
        }
        toast.success("got API response", {
            description: "Extracted video(s) from link",
        });
        setLoading(false);
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Video url</FormLabel>
                            <FormControl>
                                <Input placeholder="https://link.to/scrape" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                This should be a link for a video to be downloaded
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={loading} className="cursor-pointer">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
            </form>
        </Form>
    )
}

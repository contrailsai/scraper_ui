"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

import { get_user_profile, get_user_reels } from "@/lib/server_funcs"
import Image from "next/image"
// import Link from "next/link"
import { Reel_card } from "./reel_card"

export const Page_container = () => {

    const [username, setUsername] = useState("")
    const [reelsCount, setReelsCount] = useState(3)
    const [isLoadingProfile, setIsLoadingProfile] = useState(false)
    const [isLoadingReels, setIsLoadingReels] = useState(false)
    const [profileData, setProfileData] = useState(null)
    const [reelsData, setReelsData] = useState(null)

    const handleProfileSubmit = async (e) => {
        e.preventDefault()
        if (!username.trim()) return

        setIsLoadingProfile(true)

        try {
            const resp_data = await get_user_profile(username);

            // In a real app, you would fetch the actual profile data here
            setProfileData(resp_data)
            toast.success("got API response", {
                description: "Got profile metadata"
            })
        } catch (error) {
            toast.error("Error", {
                description: "Failed to fetch profile data",
            })
        } finally {
            setIsLoadingProfile(false)
        }
    }

    const handleReelsSubmit = async (e) => {
        e.preventDefault()
        if (!profileData) return

        setIsLoadingReels(true)

        try {

            const resp_data = await get_user_reels(username, reelsCount);

            // In a real app, you would fetch the actual reels data here
            setReelsData(resp_data)

            toast.success("got API response", {
                description: `Retrieved ${reelsCount} reels`,
            })
        } catch (error) {
            toast.error("Error", {
                description: "Failed to fetch reels data",
            })
        }
        finally {
            setIsLoadingReels(false)
        }
    }

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M"
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K"
        }
        return num.toString()
    }

    return (
        <>
            {/* Username Form */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Enter the Instagram username for the public profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <div className="flex space-x-2">
                                <Input
                                    id="username"
                                    placeholder="e.g. instagram"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <Button type="submit" disabled={isLoadingProfile}>
                                    {isLoadingProfile ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Loading
                                        </>
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Profile Data */}
            {profileData && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-shrink-0">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                                    <Image
                                        src={profileData.profile_pic_url || "/placeholder.svg"}
                                        alt={profileData.username}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-2">
                                    <h2 className="text-2xl font-bold">{profileData.username}</h2>
                                    {profileData.is_verified && (
                                        <span className="bg-blue-500 text-white rounded-full p-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-lg font-medium mb-2">{profileData.full_name}</h3>
                                <p className="text-gray-600 mb-4">{profileData.biography}</p>

                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="font-bold">{formatNumber(profileData.posts_count)}</div>
                                        <div className="text-gray-500 text-sm">Posts</div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{formatNumber(profileData.followers)}</div>
                                        <div className="text-gray-500 text-sm">Followers</div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{formatNumber(profileData.following)}</div>
                                        <div className="text-gray-500 text-sm">Following</div>
                                    </div>
                                </div>

                                {/* 
                                    {profileData.isPrivate && (
                                        <div className="mt-4 text-red-500">
                                            <p>This account is private</p>
                                        </div>
                                    )}
                                */}
                            </div>
                        </div>

                        {/* Reels Form */}
                        <div className="mt-8 pt-6 border-t">
                            <form onSubmit={handleReelsSubmit} className="space-y-4">
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="reelsCount">How many reels to extract (1-12)</Label>
                                    <div className="flex space-x-2">
                                        <Input
                                            id="reelsCount"
                                            type="number"
                                            min={1}
                                            max={12}
                                            value={reelsCount}
                                            onChange={(e) => {
                                                if (Number.isInteger(Number.parseInt(e.target.value))) {
                                                    if (Number.parseInt(e.target.value) < 1000) {
                                                        setReelsCount(Number.parseInt(e.target.value))
                                                    }
                                                }
                                            }
                                            }
                                            required
                                            className="w-24"
                                        />
                                        <Button type="submit" disabled={isLoadingReels}>
                                            {isLoadingReels ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Loading
                                                </>
                                            ) : (
                                                "Extract Reels"
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Reels Data */}
            {reelsData && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Reels ({reelsData.length})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reelsData.map((reel) => (
                            <Reel_card key={reel.code} reel={reel} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spotify } from "@/components/ui/spotify-embed";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useStore } from "@/app/stores/store";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from "react";
import { Textfit } from 'react-textfit';


function RackView() {
    const navigate = useNavigate();
    const params = useParams();
    // Access the global Mobx stores
    const { recordStore, userStore: { user } } = useStore();

    //useRef hook to persist value between renders
    const isMounted = useRef(false);

    //Negates behaviour of scrolling halfway down page upon load
    useEffect(() => {
        if (!isMounted.current) {
            window.scrollTo(0, 0)

            const loadRecord = async (id: number) => {
                try {
                    const response = await recordStore.loadRecord(id);
                    if (response) {

                    }
                } catch (error) {
                    throw (error)
                }
            }
            if (params.id) {
                loadRecord(parseInt(params.id, 10));
            }
        }
        //Set this to true after the initial render
        isMounted.current = true;
    }, [recordStore])

    function formatAddedDate(date: string) {
        // Parse the original date string into a Date object
        const dateObject = new Date(date);

        // Format the Date object into the desired format "YYYY-MM-DD"
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(dateObject.getDate()).padStart(2, '0');

        // Create the formatted date string
        return `${year}-${month}-${day}`;
    }

    if (recordStore.selectedRecord == undefined) {
        if (params.username) {
            console.log(params.username)
        }
        else {
            navigate('/', { replace: true });
        }
    }
    else {
        return (
            <div className="container h-full flex flex-col gap-12">
                <div className="flex flex-col lg:flex-row gap-4 md:gap-10 lg:gap-12 xl:gap-24 items-center">
                    {/* Image */}
                    <div className="flex flex-col mt-28 w-full sm:w-3/4 md:w-2/3 gap-6 items-start justify-between lg:justify-center sm:self-start lg:self-center">
                        
                        <p className="text-base">Back to {params.username}'s record rack</p>
                        <img
                            style={{ viewTransitionName: `album-cover-${recordStore.selectedRecord.id}`, contain: 'layout' }}
                            className="mt-0 rounded-xl shadow-lg"
                            src={recordStore.selectedRecord?.photoURL}
                            alt="hero"
                            draggable="false"
                        />
                    </div>

                    {/* Album info */}
                    <div className="w-full mt-6 sm:mt-12 lg:mt-40 flex flex-col gap-4 xl:gap-8 items-start">
                        {/* Name, artist, etc */}
                        <div className="w-full flex flex-col items-start">
                            <div className="w-full h-auto md:h-[75px]">
                                <Textfit className="h-full flex items-end" mode="multi" forceSingleModeWidth={true} min={24} max={64}>
                                    <h1 className="w-full font-black text-neutral-900 leading-none dark:text-neutral-50">
                                        {recordStore.selectedRecord?.albumName}
                                    </h1>
                                </Textfit>
                            </div>
                            {/* <RackViewHeader content={recordStore.selectedRecord?.albumName}></RackViewHeader> */}
                            <h2 className="max-w-xl text-lg md:text-2xl font-semibold text-neutral-800 text-left dark:text-neutral-100">
                                {(recordStore.selectedRecord!.albumType).charAt(0).toUpperCase() + recordStore.selectedRecord!.albumType.slice(1)} by {recordStore.selectedRecord?.artistName}
                            </h2>
                            <div className="flex flex-col mt-8 lg:flex-row items-start lg:items-center">
                                <h2 className="max-w-xl text-lg lg:text-xl text-neutral-800 text-left dark:text-neutral-100">
                                    Released on {recordStore.selectedRecord?.releaseDate}
                                </h2>
                                <p className="hidden lg:block mx-3 text-xl leading-0 ">&#x2022;</p>
                                <h3 className="max-w-xl text-lg lg:text-xl text-neutral-700 text-left dark:text-neutral-400">
                                    Added on {formatAddedDate(recordStore.selectedRecord!.dateAdded)}
                                </h3>
                            </div>
                        </div>

                        {/* RECORD DESCRIPTION */}
                        <div className="flex flex-row gap-12 mt-4 lg:mt-0 items-start w-full text-neutral-800 dark:text-neutral-50">
                            <div className="grid w-full gap-4 py-4">
                                <Label htmlFor="message" className="text-base md:text-xl font-bold">Record Description</Label>
                                <Textarea className="resize-none xl:h-[160px] placeholder:text-neutral-950 bg-neutral-200" placeholder={recordStore.selectedRecord?.albumDescription} disabled />
                            </div>
                        </div>

                        <div className="w-full flex flex-col items-start">
                            <div className="flex gap-12 flex-row items-center">
                                <div className="flex flex-row gap-4 items-center">
                                    <Label htmlFor="private" className="text-base md:text-xl font-bold">Private</Label>
                                    <Switch id="private" disabled checked={recordStore.selectedRecord?.isPrivate} />
                                </div>
                                {params.username == user?.userName ? (
                                    <div>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button>Edit Fields</Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-[75vw] lg:max-w-[725px]">
                                                <DialogHeader>
                                                    <DialogTitle className="mt-4 lg:mt-0">Editing {recordStore.selectedRecord!.albumType} {recordStore.selectedRecord!.albumName} by {recordStore.selectedRecord!.artistName}</DialogTitle>
                                                    <DialogDescription>
                                                        You can edit these fields.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <Label htmlFor="message">Record Description</Label>
                                                    <Textarea placeholder="Change your notes or thoughts about the record." />
                                                    <Label htmlFor="private">Set as Private?</Label>
                                                    <Switch id="private" />
                                                </div>
                                                <DialogFooter>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button>Edit Fields</Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-[75vw] lg:max-w-[725px]">
                                                            <DialogHeader>
                                                                <DialogTitle className="mt-4 lg:mt-0">Editing {recordStore.selectedRecord!.albumType} {recordStore.selectedRecord!.albumName} by {recordStore.selectedRecord!.artistName}</DialogTitle>
                                                                <DialogDescription>
                                                                    You can edit these fields.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-4 py-4">
                                                                <Label htmlFor="message">Record Description</Label>
                                                                <Textarea placeholder="Change your notes or thoughts about the record." />
                                                                <Label htmlFor="private">Set as Private?</Label>
                                                                <Switch id="private" />
                                                            </div>
                                                            <DialogFooter>
                                                                <Button type="submit">Add to Rack</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                ) : (
                                    <div className="flex flex-row gap-4">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button>Add to Your Rack</Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-[75vw] lg:max-w-[725px]">
                                                <DialogHeader>
                                                    <DialogTitle className="mt-4 lg:mt-0">Adding album The Off-Season by J.Cole</DialogTitle>
                                                    <DialogDescription>
                                                        This album will be added to your racklist.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <Label htmlFor="message">Record Description</Label>
                                                    <Textarea placeholder="Add some additional notes or thoughts about the album." />
                                                    <Label htmlFor="private">Set as Private?</Label>
                                                    <Switch id="private" />
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit">Add to Rack</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12">
                    {recordStore.selectedRecord?.albumType === "album" ? (
                        <Spotify className="mb-20" width={"100%"} link={`https://open.spotify.com/${recordStore.selectedRecord?.albumType}/${recordStore.selectedRecord?.spotifyID}`} />
                    ) : (
                        <Spotify className="mb-8 lg:mb-0" wide link={`https://open.spotify.com/${recordStore.selectedRecord?.albumType}/${recordStore.selectedRecord?.spotifyID}`} />
                    )}
                </div>

            </div>
        )
    }


}

export default observer(RackView);
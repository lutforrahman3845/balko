"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Info } from "lucide-react";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex flex-wrap items-start gap-3">
        {children}
      </CardContent>
    </Card>
  );
}

export default function UiKitPage() {
  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">UI Kit</h1>
        <p className="text-sm text-muted-foreground mt-1">
          The building blocks included with this template.
        </p>
      </div>

      <Section title="Buttons" description="Variants and sizes">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
      </Section>

      <Section title="Badges">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </Section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Form controls</CardTitle>
            <CardDescription>Inputs, toggles, and selections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="demo-input">Email</Label>
              <Input id="demo-input" placeholder="name@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-textarea">Message</Label>
              <Textarea id="demo-textarea" placeholder="Write something..." />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="demo-check" defaultChecked />
              <Label htmlFor="demo-check" className="font-normal">
                Subscribe to updates
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="demo-switch" defaultChecked />
              <Label htmlFor="demo-switch" className="font-normal">
                Enable notifications
              </Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overlays & feedback</CardTitle>
            <CardDescription>Dialogs, menus, tooltips, toasts</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-start gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog title</DialogTitle>
                  <DialogDescription>
                    This is an example modal dialog from the kit.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button>Confirm</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Menu <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Info className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Helpful tooltip</TooltipContent>
            </Tooltip>

            <Button onClick={() => toast.success("Saved successfully!")}>
              Success toast
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.error("Something went wrong.")}
            >
              Error toast
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Avatars</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            {["avatar-1", "avatar-2", "avatar-3", "avatar-5"].map((a) => (
              <Avatar key={a} size="lg">
                <AvatarImage src={`/avatars/${a}.jpg`} alt={a} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tabs</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="text-sm text-muted-foreground pt-2">
                Overview panel content.
              </TabsContent>
              <TabsContent value="activity" className="text-sm text-muted-foreground pt-2">
                Activity panel content.
              </TabsContent>
              <TabsContent value="settings" className="text-sm text-muted-foreground pt-2">
                Settings panel content.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

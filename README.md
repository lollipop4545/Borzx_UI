# @borzx.dev/components

Accessible, customizable, and beautifully crafted UI components built for modern React and Tailwind CSS applications.

## Installation

```bash
npm install @borzx.dev/components
# or
pnpm add @borzx.dev/components
# or
yarn add @borzx.dev/components
```

### Peer Dependencies
Ensure you have `react` and `react-dom` (version 18 or 19) installed:
```bash
npm install react react-dom
```

## Styling

Import the package stylesheet in your root layout or entry file (e.g., `app/layout.tsx` or `pages/_app.tsx`):

```tsx
import "@borzx.dev/components/styles.css";
```

## Usage Example

```tsx
import { Button } from "@borzx.dev/components";

export default function MyComponent() {
  return (
    <Button variant="default" size="md" onClick={() => console.log("clicked")}>
      Click me
    </Button>
  );
}
```

### Utility Import (`cn`)
You can import `cn` directly from the main bundle or from the dedicated utility subpath without any client-side overhead:

```tsx
import { cn } from "@borzx.dev/components/utils";
```

## Next.js App Router Support

`@borzx.dev/components` is fully compatible with Next.js App Router and React Server Components (RSC):
- The main entry point (`@borzx.dev/components`) includes the `"use client"` banner, enabling client-side stateful primitives (such as `Dialog`, `DropdownMenu`, `Tabs`, `Popover`, etc.) to run smoothly without manual client wrappers.
- The utility subpath (`@borzx.dev/components/utils`) is server-safe and has no `"use client"` directive, allowing it to be used freely in Server Components.

## Exported Components

- **Accordion** (`Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`)
- **Alert** (`Alert`, `AlertTitle`, `AlertDescription`)
- **Autocomplete** (`Autocomplete`, `AutocompleteInput`, `AutocompleteList`, `AutocompleteItem`)
- **Avatar** (`Avatar`, `AvatarImage`, `AvatarFallback`)
- **Badge** (`Badge`, `badgeVariants`)
- **Breadcrumb** (`Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`)
- **Button** (`Button`, `buttonVariants`)
- **Calendar** (`Calendar`)
- **Card** (`Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardDescription`, `CardContent`)
- **Checkbox** (`Checkbox`)
- **Command** (`Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`, `CommandSeparator`)
- **DatePicker** (`DatePicker`)
- **Dialog** (`Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`)
- **DropdownMenu** (`DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuRadioGroup`)
- **Input** (`Input`)
- **InputGroup** (`InputGroup`, `InputGroupAddon`, `InputGroupButton`, `InputGroupText`)
- **Label** (`Label`)
- **MultiSelect** (`MultiSelect`)
- **NavigationMenu** (`NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuContent`, `NavigationMenuTrigger`, `NavigationMenuLink`, `NavigationMenuIndicator`, `NavigationMenuViewport`)
- **Popover** (`Popover`, `PopoverTrigger`, `PopoverContent`)
- **Progress** (`Progress`)
- **RadioGroup** (`RadioGroup`, `RadioGroupItem`)
- **Select** (`Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`)
- **Separator** (`Separator`)
- **Sheet** (`Sheet`, `SheetTrigger`, `SheetClose`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`)
- **Skeleton** (`Skeleton`)
- **Slider** (`Slider`)
- **SonnerToaster** (`SonnerToaster`)
- **Stepper** (`Stepper`, `StepperItem`, `StepperTrigger`, `StepperIndicator`, `StepperTitle`, `StepperDescription`, `StepperSeparator`)
- **Switch** (`Switch`)
- **Tabs** (`Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`)
- **Textarea** (`Textarea`)
- **Toast** (`Toast`, `ToastProvider`, `ToastViewport`, `ToastTitle`, `ToastDescription`, `ToastClose`, `ToastAction`)
- **Utilities** (`cn`)

## License

MIT

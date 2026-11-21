import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE IF NOT EXISTS "vehicle_makes" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "logo_id" integer,
    "description" varchar,
    "display_order" numeric DEFAULT 0,
    "published" boolean DEFAULT true,
    "generate_slug" boolean DEFAULT false,
    "slug" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "vehicle_years" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "year" numeric NOT NULL,
    "display_order" numeric DEFAULT 0,
    "published" boolean DEFAULT true,
    "generate_slug" boolean DEFAULT false,
    "slug" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "engine_types" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "description" varchar,
    "long_title" varchar,
    "main_image_id" integer,
    "display_order" numeric DEFAULT 0,
    "featured" boolean DEFAULT false,
    "published" boolean DEFAULT true,
    "generate_slug" boolean DEFAULT false,
    "slug" varchar NOT NULL,
    "meta_title" varchar,
    "meta_description" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "vehicle_models_rels" (
    "id" serial PRIMARY KEY NOT NULL,
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" varchar NOT NULL,
    "vehicle_years_id" integer
  );

  ALTER TABLE "vehicle_models" ADD COLUMN IF NOT EXISTS "make_id" integer;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "vehicle_make_id" integer;
  ALTER TABLE "products_rels" ADD COLUMN IF NOT EXISTS "engine_types_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_vehicle_make_id" integer;
  ALTER TABLE "_products_v_rels" ADD COLUMN IF NOT EXISTS "engine_types_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "vehicle_makes_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "vehicle_years_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "engine_types_id" integer;

  DO $$ BEGIN
    ALTER TABLE "vehicle_makes" ADD CONSTRAINT "vehicle_makes_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "engine_types" ADD CONSTRAINT "engine_types_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "vehicle_models" ADD CONSTRAINT "vehicle_models_make_id_vehicle_makes_id_fk" FOREIGN KEY ("make_id") REFERENCES "public"."vehicle_makes"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "vehicle_models_rels" ADD CONSTRAINT "vehicle_models_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vehicle_models"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "vehicle_models_rels" ADD CONSTRAINT "vehicle_models_rels_vehicle_years_fk" FOREIGN KEY ("vehicle_years_id") REFERENCES "public"."vehicle_years"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "products" ADD CONSTRAINT "products_vehicle_make_id_vehicle_makes_id_fk" FOREIGN KEY ("vehicle_make_id") REFERENCES "public"."vehicle_makes"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_engine_types_fk" FOREIGN KEY ("engine_types_id") REFERENCES "public"."engine_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_vehicle_make_id_vehicle_makes_id_fk" FOREIGN KEY ("version_vehicle_make_id") REFERENCES "public"."vehicle_makes"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_engine_types_fk" FOREIGN KEY ("engine_types_id") REFERENCES "public"."engine_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vehicle_makes_fk" FOREIGN KEY ("vehicle_makes_id") REFERENCES "public"."vehicle_makes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vehicle_years_fk" FOREIGN KEY ("vehicle_years_id") REFERENCES "public"."vehicle_years"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_engine_types_fk" FOREIGN KEY ("engine_types_id") REFERENCES "public"."engine_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  CREATE INDEX IF NOT EXISTS "vehicle_makes_logo_idx" ON "vehicle_makes" USING btree ("logo_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "vehicle_makes_slug_idx" ON "vehicle_makes" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "vehicle_makes_updated_at_idx" ON "vehicle_makes" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "vehicle_makes_created_at_idx" ON "vehicle_makes" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "vehicle_years_year_idx" ON "vehicle_years" USING btree ("year");
  CREATE UNIQUE INDEX IF NOT EXISTS "vehicle_years_slug_idx" ON "vehicle_years" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "vehicle_years_updated_at_idx" ON "vehicle_years" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "vehicle_years_created_at_idx" ON "vehicle_years" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "engine_types_main_image_idx" ON "engine_types" USING btree ("main_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "engine_types_slug_idx" ON "engine_types" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "engine_types_updated_at_idx" ON "engine_types" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "engine_types_created_at_idx" ON "engine_types" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "vehicle_models_make_idx" ON "vehicle_models" USING btree ("make_id");
  CREATE INDEX IF NOT EXISTS "vehicle_models_rels_order_idx" ON "vehicle_models_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "vehicle_models_rels_parent_idx" ON "vehicle_models_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "vehicle_models_rels_path_idx" ON "vehicle_models_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "vehicle_models_rels_vehicle_years_id_idx" ON "vehicle_models_rels" USING btree ("vehicle_years_id");
  CREATE INDEX IF NOT EXISTS "products_vehicle_make_idx" ON "products" USING btree ("vehicle_make_id");
  CREATE INDEX IF NOT EXISTS "products_rels_engine_types_id_idx" ON "products_rels" USING btree ("engine_types_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_vehicle_make_idx" ON "_products_v" USING btree ("version_vehicle_make_id");
  CREATE INDEX IF NOT EXISTS "_products_v_rels_engine_types_id_idx" ON "_products_v_rels" USING btree ("engine_types_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_vehicle_makes_id_idx" ON "payload_locked_documents_rels" USING btree ("vehicle_makes_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_vehicle_years_id_idx" ON "payload_locked_documents_rels" USING btree ("vehicle_years_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_engine_types_id_idx" ON "payload_locked_documents_rels" USING btree ("engine_types_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "engine_types_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "vehicle_years_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "vehicle_makes_id";
  ALTER TABLE "_products_v_rels" DROP COLUMN IF EXISTS "engine_types_id";
  ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_vehicle_make_id";
  ALTER TABLE "products_rels" DROP COLUMN IF EXISTS "engine_types_id";
  ALTER TABLE "products" DROP COLUMN IF EXISTS "vehicle_make_id";
  ALTER TABLE "vehicle_models" DROP COLUMN IF EXISTS "make_id";
  DROP TABLE IF EXISTS "vehicle_models_rels" CASCADE;
  DROP TABLE IF EXISTS "engine_types" CASCADE;
  DROP TABLE IF EXISTS "vehicle_years" CASCADE;
  DROP TABLE IF EXISTS "vehicle_makes" CASCADE;
  `)
}
